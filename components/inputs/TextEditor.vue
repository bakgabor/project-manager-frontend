<template>
  <div>
    <span v-if="title">{{ title }}</span>
    <br v-if="title" />
    <textarea
      @keydown.tab.prevent="tabber($event)"
      v-model="localText"
      :rows="rows"
      :cols="cols"
      @blur="blur"
    />
  </div>
</template>

<script>
export default {
  name: 'TextEditor',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 20,
    },
    cols: {
      type: Number,
      default: 65,
    },
  },
  model: {
    prop: 'text',
    event: 'change',
  },
  computed: {
    localText: {
      get() {
        return this.text
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    blur() {
      this.$emit('blur')
    },
    tabber(event) {
      if (event) {
        event.preventDefault()
        if (this.localText === null) {
          this.localText = `\t`
          event.target.selectionEnd = event.target.selectionStart + 1
          return
        }
        const startText = this.localText.slice(0, event.target.selectionStart)
        const endText = this.localText.slice(event.target.selectionEnd)
        const back = event.target.selectionStart + 1
        this.localText = `${startText}\t${endText}`
        setTimeout(() => {
          event.target.setSelectionRange(back, back)
        }, 10)
      }
    },
  },
}
</script>

<style scoped></style>
