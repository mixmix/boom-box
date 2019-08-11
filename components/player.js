const template = `
  <div class='Player'>
    <audio ref='player' controls autoplay v-on:ended='nextTrack' />
    <div class='tracks'>
      <div class='track' v-for='(track, i) in music' v-on:click='selectTrack(i)' :class='trackClass(i)' :key='track.uri'>
        <div class='num'>{{i < 9 ? ('0' + (i+1)) : (i+1)}}</div>
        <div class='divider'></div>
        <div class='name'>{{track.name}}</div>
      </div>
    </div>
  </div>
`

const styles = `
.Player {
  > audio {
    width: 100%;
    filter: brightness(1.1);
    margin-bottom: 1rem;
  }

  > .tracks {
    > .track {
      cursor: pointer;

      display: grid;
      grid-template-columns: auto auto 1fr;
      grid-gap: 10px;

      &.selected {
        background: black;
        color: white;
      }

      > .num {
        font-size: .8rem;
        letter-spacing: 1px;
        padding: 3px 0 3px 13px;
      }
      > .divider { border-left: 1px solid black; }
      > .name {
        padding: 3px 0;
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
