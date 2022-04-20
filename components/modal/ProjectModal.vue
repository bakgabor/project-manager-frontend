<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('buttons.projectData') }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field horizontal :label="$t('fields.name')" message="">
          <b-input v-model="submitData.name" name="name" required />
        </b-field>
        <b-field horizontal :label="$t('fields.keywords')" message="">
          <key-editor v-model="submitData.keywords" />
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
import KeyEditor from '~/components/inputs/KeyEditor'

export default {
  name: 'ProjectModal',
  components: { KeyEditor },
  props: {
    name: {
      type: String,
      default: null,
    },
    keywords: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      submitData: {
        name: this.name,
        keywords: this.keywords,
      },
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.submitData)
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.modal-card-body {
  width: 65vw;
}
</style>
