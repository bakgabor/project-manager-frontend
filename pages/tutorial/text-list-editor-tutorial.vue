<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Text list editor" icon="ballot">
        <text-list-editor v-model="list" />
      </card-component>
      <card-component title="Text list" icon="ballot">
        {{ list }}
      </card-component>
    </section>
  </div>
</template>

<script>
import TextListEditor from '@/components/inputs/TextListEditor'
import CardComponent from '@/components/default/card/CardComponent'

export default {
  name: 'text-list-tutorial',
  components: { TextListEditor, CardComponent },
  data() {
    return {
      list: [],
    }
  },
}
</script>
th
<style scoped></style>
