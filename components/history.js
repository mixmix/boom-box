const template = `
 <div class='History' v-if='history.length'>
   <div class='title'></div>
   <div class='tape' v-for='tape in history' v-on:click="$emit('load-tape', tape.uri)" :class='tapeClass(tape)'>
     {{tape.name}}
   </div>
 </div>
`

const styles = `
.History {
  font-family: arial;

  > .title {
    font-size: .8rem;
    letter-spacing: 1px;
    border-bottom: 1px solid black;
  }

  > .tape {
    padding: 4px;
    cursor: pointer;

    &.selected {
      background: black;
      color: white;
    }
  }
}
`

export default {
  props: {
    uri: String,
    name: String
  },
  data: () => ({
    history: []
  }),
  methods: {
    tapeClass (testTape) {
      return testTape.uri === this.uri ? 'selected' : ''
    }
  },
  created () {
    this.history = JSON.parse(localStorage.boomBox || '[]') // eslint-disable-line
      .sort((a, b) => (b.name > a.name) ? -1 : +1)
  },
  watch: {
    uri (next) {
      if (!next.length) return

      const newHistory = [ ...this.history ]
        .filter(tape => tape.uri !== next)

      newHistory.unshift({ uri: next, name: this.name })
      newHistory.sort((a, b) => (b.name > a.name) ? -1 : +1)

      this.history = newHistory
    },
    history (next) {
      localStorage.boomBox = JSON.stringify(this.history) // eslint-disable-line
    }
  },
  template,
  styles
}
