<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Html editor" icon="ballot">
        <HtmlEditor />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import HtmlEditor from '@/components/inputs/HtmlEditor'

export default {
  name: 'text-list-tutorial',
  components: { CardComponent, HtmlEditor },
  data() {
    return {
      text: 'ez egy szoveg és igy nez ki egy kulcs \n <div>\n\t html \n</div>',
    }
  },
}
</script>
th
<style scoped></style>
