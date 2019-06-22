const { yo, DatArchive } = document.__modules

const noCassette = yo`
  <div>Load a cassette!</div>
`
const musicExtnsionRegexp = /\.(mp3|m4a)$/

export default async function Player (link) {
  if (!link) return noCassette

  // link = 'dat://ef69934eb101628180d7dfa72ef04df038b534c943be510b4e4bb8f2d7b5e6b5'
  if (!link.endsWith('/')) link = link + '/'

  const archive = new DatArchive(link)
  const files = await archive.readdir()

  const tracks = files.filter(isMusic)
  const audio = Audio(join(link, tracks[0]))
  return yo`
    <div>
      Player: ${link}
      ${audio}
      <ol class="Tracks">
        ${tracks.map(Track)}
      </ol>
    </div>
  `

  function Track (track) {
    return yo`
      <li>
        <a href="#" onclick=${playTrack(track)}>
          <span>▶️ </span>
          ${track}
        </a>
      </li>
    `
  }

  function playTrack (track) {
    return function (ev) {
      ev.preventDefault()
      ev.stopPropagation()

      audio.pause()
      audio.src = join(link, track)
      audio.play()

      // const newAudio = Audio(join(link, track))
      // yo.update(audio, newAudio)
      // newAudio.play()
    }
  }
}

function Audio (src) {
  return yo`
    <audio class="Player" style="width: 400px" controls="" src="${src}"></audio>
  `
}

function join (link, track) {
  return link + track
}

function isMusic (filename) {
  return filename.match(musicExtnsionRegexp)
}

// function cify (promise) {
//   return function () {
//     var args = Array.from(arguments)
//     var cb = args.pop()
//     promise.call(null, args)
//       .then(result => cb(null, result))
//       .catch(err => cb(err))
//   }
// }
