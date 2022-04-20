<template>
  <div>
    <card-component :title="$t('buttons.newProject')" icon="ballot">
      <b-field horizontal :label="$t('fields.name')" message="">
        <b-input v-model="projectData.name" name="name" required />
      </b-field>
      <b-field horizontal :label="$t('fields.keywords')" message="">
        <key-editor v-model="projectData.keywords" />
      </b-field>
      <b-field horizontal message="">
        <button type="button" class="button is-primary" @click="save">
          <span> {{ $t('buttons.save') }} </span>
        </button>
      </b-field>
    </card-component>
  </div>
</template>

<script>
import CardComponent from '~/components/default/card/CardComponent'
import KeyEditor from '~/components/inputs/KeyEditor'

export default {
  name: 'NewProject',
  components: { CardComponent, KeyEditor },
  data() {
    return {
      projectData: {
        name: '',
        keywords: [],
      },
    }
  },
  methods: {
    save() {
      this.$emit('create', this.projectData)
    },
  },
}
</script>

<style scoped></style>
