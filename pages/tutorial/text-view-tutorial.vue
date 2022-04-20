<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Text view" icon="ballot">
        <text-view :text="text" highlight="egy,kulcs" />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import TextView from '@/components/views/TextView'

export default {
  name: 'text-list-tutorial',
  components: { CardComponent, TextView },
  data() {
    return {
      text: 'ez egy szoveg és igy nez ki egy kulcs \n <div>\n\t html \n</div>',
    }
  },
}
</script>
<style scoped></style>
