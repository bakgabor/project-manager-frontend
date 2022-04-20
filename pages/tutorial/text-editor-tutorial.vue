<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Text editor" icon="ballot">
        <text-editor v-model="text" :cols="90" />
      </card-component>
      <card-component title="text" icon="ballot">
        {{ text }}
      </card-component>
    </section>
  </div>
</template>

<script>
import TextEditor from '@/components/inputs/TextEditor'
import CardComponent from '@/components/default/card/CardComponent'
export default {
  name: 'text-editor-tutorial',
  components: { TextEditor, CardComponent },
  data() {
    return {
      text: '',
    }
  },
}
</script>

<style scoped></style>
