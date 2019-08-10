const musicExtensionRegexp = /\.(mp3|m4a|aac|ogg|wav)$/
const numberPrefixRegexp = /^\d+\s*/
const artExtensionRegexp = /\.(jpg|jpeg|png|gif)$/

export default function loadCassette (link, cb) {
  if (!link.endsWith('/')) link = link + '/'

  const archive = new DatArchive(link) // eslint-disable-line
  archive.readdir()
    .then(dir => {
      const music = dir
        .filter(isMusic)
        .sort()
        .map(filename => {
          return {
            uri: join(link, filename),
            name: trackName(filename)
          }
        })

      const art = dir
        .filter(isArt)
        .sort()
        .map(filename => {
          return {
            uri: join(link, filename)
          }
        })

      cb(null, { music, art })
    })
    .catch(err => cb(err))
}

function isMusic (filename) {
  return filename.match(musicExtensionRegexp)
}

function isArt (filename) {
  return filename.match(artExtensionRegexp)
}

function join (link, track) {
  return link + track
}

function trackName (filename) {
  return filename
    .replace(numberPrefixRegexp, '')
    .replace(musicExtensionRegexp, '')
}
