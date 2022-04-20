<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field :label="firstTitle">
          <b-input
            type="title"
            v-model="submitData.firstData"
            :required="checkFirstData"
          ></b-input>
        </b-field>

        <b-field :label="secondTitle">
          <text-editor v-model="submitData.secondData" :rows="5" />
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
  name: 'TextAndTitleModal',
  components: { TextEditor },
  props: {
    modalTitle: {
      type: String,
      default: '',
    },
    firstTitle: {
      type: String,
      default: '',
    },
    secondTitle: {
      type: String,
      default: '',
    },
    firstData: {
      type: String,
      default: null,
    },
    secondData: {
      type: String,
      default: null,
    },
    checkFirstData: {
      type: Boolean,
      default: false,
    },
    checkSecondData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      submitData: {
        firstData: this.firstData,
        secondData: this.secondData,
      },
    }
  },
  methods: {
    submit() {
      if (this.checkFirstData && !this.submitData.firstData) {
        return
      }
      if (this.checkSecondData && !this.submitData.secondData) {
        return
      }
      this.$emit('submit', this.submitData)
      this.$emit('close')
    },
  },
}
</script>

<style scoped></style>
