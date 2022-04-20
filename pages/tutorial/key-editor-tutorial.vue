<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Key editor" icon="ballot">
        <key-editor title="Key editor:" v-model="keys" />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import KeyEditor from '@/components/inputs/KeyEditor'

export default {
  name: 'text-list-tutorial',
  components: { CardComponent, KeyEditor },
  data() {
    return {
      keys: ['test', 'test2'],
    }
  },
}
</script>
<style scoped></style>
