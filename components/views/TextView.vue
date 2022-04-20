<template>
  <div class="text-container" v-html="getText()"></div>
</template>

<script>
export default {
  name: 'TextView',
  props: {
    text: {
      type: String,
      default: null,
    },
    highlight: {
      type: String,
      default: null,
    },
  },
  methods: {
    getText() {
      if (this.text) {
        let text = this.$formatter.textToHtml(this.text)
        text = this.$formatter.createHighlight(text, this.highlight)
        return text
      }
      return ''
    },
  },
}
</script>

<style scoped></style>
