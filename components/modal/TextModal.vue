<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field>
          <text-editor v-model="text" :rows="5" />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('main.cancel')" @click="$emit('close')" />
        <button type="submit" class="button is-primary">
          {{ $t('main.confirm') }}
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import TextEditor from '~/components/inputs/TextEditor'

export default {
  name: 'TextModal',
  components: { TextEditor },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      text: this.content,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.text)
      this.$emit('close')
    },
  },
}
</script>

<style scoped></style>
