import Vue from './lib/vue.js'
import loadCassette from './lib/load-cassette.js'

import Player from './components/player.js'
import CoverArt from './components/cover-art.js'

const template = `
  <div>
    <h1>boom-box</h1>
    <input type='text' v-on:keyup="processInput"/>
    <!-- <CoverArt :art='art' v-if='isPlayable' /> -->
    <Player :music='music' v-if='isPlayable' />
  </div>
`
// <audio class="Player" style="width: 400px" controls="" src="{src}"></audio>

// link = 'dat://ef69934eb101628180d7dfa72ef04df038b534c943be510b4e4bb8f2d7b5e6b5'

new Vue({ // eslint-disable-line
  el: '#app',
  data: {
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

      loadCassette(link, (err, data) => {
        if (err) {
          console.error(err)
          // TODO ... display to user
          return
        }

        this.music = data.music
        this.art = data.art
      })
    }
  },
  template,
  components: {
    Player,
    CoverArt,
  }
})

function isDatUri (link) {
  return link.startsWith('dat://')
}
