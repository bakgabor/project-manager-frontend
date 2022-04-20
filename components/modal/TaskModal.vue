<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('fields.newTask') }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field :label="$t('fields.task')">
          <b-input type="title" v-model="submitData.task" required> </b-input>
        </b-field>

        <b-field :label="$t('fields.description')">
          <textarea v-model="submitData.description" :rows="5" :cols="30" />
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
export default {
  name: 'TaskModal',
  data() {
    return {
      submitData: {
        task: '',
        description: '',
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

<style scoped></style>
