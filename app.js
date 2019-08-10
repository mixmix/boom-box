import loadCassette from './lib/load-cassette.js'
import Player from './components/player.js'
import CoverArt from './components/cover-art.js'
import History from './components/history.js'

const template = `
  <div class='App'>
    <h1>boom-box</h1>
    <input type='text' v-on:keyup="processInput"/>
    <Player :music='music' v-if='isPlayable' />
    <History :tape='tape' v-on:load-tape='playCassette($event)'/>
    <CoverArt :art='art' v-if='isPlayable' />
  </div>
`

const styles = `
.App {
  font-family: arial;

  > input {
    width: 50vw;
    padding: 5px;
  }
}
`

// example tape:
// dat://ef69934eb101628180d7dfa72ef04df038b534c943be510b4e4bb8f2d7b5e6b5

export default { // eslint-disable-line
  el: '#app',
  data: {
    tape: '',
    music: [],
    art: []
  },
  computed: {
    isPlayable () {
      return this.music.length > 0
    }
  },
  methods: {
    processInput (ev) {
      var link = ev.target.value
      if (!isDatUri(link)) return

      this.playCassette(link)
    },
    playCassette (link) {
      loadCassette(link, (err, data) => {
        if (err) {
          console.error(err)
          // TODO ... display to user
          return
        }

        this.tape = link
        this.music = data.music
        this.art = data.art
      })
    }
  },
  template,
  styles,
  components: {
    Player,
    CoverArt,
    History
  }
}

function isDatUri (link) {
  return link.startsWith('dat://')
}
