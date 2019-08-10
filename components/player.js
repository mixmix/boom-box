const template = `
  <div class='Player'>
    <audio ref='player' controls autoplay v-on:ended='nextTrack' />
    <div class='tracks'>
      <div v-for='(track, i) in music' v-on:click='selectTrack(i)' :class='trackClass(i)' :key='track.uri'>
        {{i + 1}}. {{track.name}}
      </div>
    </div>
    <
  </div>
`

const styles = `
.Player {
  audio {
  }
  color: blue;

  .tracks {
    div {
      cursor: pointer;
      padding: 4px;

      &.selected {
        background: black;
        color: white;
      }
    }
  }
}
`

export default {
  props: {
    music: Array
  },
  data: () => ({
    currentTrack: null
  }),
  methods: {
    selectTrack (i) {
      this.currentTrack = i
    },
    nextTrack () {
      if (this.currentTrack === this.music.length - 1) this.currentTrack = null
      else this.currentTrack = this.currentTrack + 1
    },
    trackClass (i) {
      return i === this.currentTrack ? 'selected' : ''
    }
  },
  watch: {
    currentTrack (next, prev) {
      if (next === null) {
        this.$refs.player.pause()
        return
      }

      this.$refs.player.src = this.music[next].uri
      this.$refs.player.load()
    },
    music (next) {
      this.currentTrack = 0
      this.$refs.player.src = this.music[0].uri
      this.$refs.player.load()
    }
  },
  created () {
    this.currentTrack = 0
  },
  template,
  styles
}
