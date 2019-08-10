const template = `
 <div class='CoverArt'>
   <img :src='src'>
 </div>
`

// TODO if multiple art, then could give option to scroll through them

export default {
  props: {
    art: Array
  },
  computed: {
    src () {
      if (!this.art.length) return ''
      if (!this.art[0].uri) return ''

      return this.art[0].uri
    }
  },
  template
}
