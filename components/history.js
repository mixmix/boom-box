const template = `
 <div class='History'>
   <div v-for='tape in history' v-on:click="$emit('load-tape', tape)" :class='tapeClass(tape)'>
     {{tape}}
   </div>
 </div>
`

const styles = `
.History {
  font-family: mono-space;

  div {
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
    tape: String
  },
  data: () => ({
    history: []
  }),
  methods: {
    tapeClass (testTape) {
      return testTape === this.tape ? 'selected' : ''
    }
  },
  created () {
    this.history = JSON.parse(localStorage.boomBox || '[]') // eslint-disable-line
  },
  watch: {
    tape (next) {
      if (!this.tape.length) return

      this.history = Array.from(
        new Set([ next, ...this.history ])
      )
    },
    history (next) {
      localStorage.boomBox = JSON.stringify(this.history) // eslint-disable-line
    }
  },
  template,
  styles
}
