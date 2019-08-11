import loadCassette from './lib/load-cassette.js'
import Player from './components/player.js'
import CoverArt from './components/cover-art.js'
import History from './components/history.js'

const template = `
  <div class='App'>
    <h1>{{name}}</h1>
    <div>
      <div class='left' v-if='isPlayable'>
        <CoverArt :art='art' />
        <Player :music='music' />
      </div>
      <div class='right'>
        <input type='text' placeholder='give me DAT mixtape' v-on:keyup="processInput" ref='input' />
        <History :uri='uri' :name='name' v-on:load-tape='playCassette($event)'/>
      </div>
   </div>
  </div>
`

// example tape:
// dat://ef69934eb101628180d7dfa72ef04df038b534c943be510b4e4bb8f2d7b5e6b5

const App = { // eslint-disable-line
  el: '#app',
  data: {
    uri: '',
    name: 'boom-box',
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
      var link = ev.target.value.trim()
      if (!isDatUri(link)) return

      if (link === this.uri) return
      this.playCassette(link)
    },
    playCassette (link) {
      loadCassette(link, (err, data) => {
        if (err) {
          console.error(err)
          // TODO ... display to user
          return
        }

        this.uri = link
        this.$refs.input.value = link
        this.name = data.name
        this.music = data.music
        this.art = data.art
      })
    }
  },
  template,
  components: {
    Player,
    CoverArt,
    History
  }
}

App.styles = `
.App {
  font-family: arial;
  padding: 2rem;

  >h1 {
    margin: 0;
  }

  >div {
    display: grid;
    grid-template-columns: 40rem 30rem;
    grid-gap: 4rem;
    justify-content: start;

    > .left {

      > .Player {
        margin-top: 1rem;
      }
    }

    > .right {
      max-width: 30rem;

      > input {
        width: 30rem;
        padding: 5px;
        margin-bottom: 3rem;
      }
    }
  }
}
`

export default App

function isDatUri (link) {
  return link.startsWith('dat://')
}
