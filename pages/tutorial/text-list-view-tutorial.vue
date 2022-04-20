<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Text list view" icon="ballot">
        <text-list-view :list="list" />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import TextListView from '@/components/views/TextListView'

export default {
  name: 'text-list-tutorial',
  components: { CardComponent, TextListView },
  data() {
    return {
      list: [
        {
          title: 'first text',
          content:
            '1 ez egy szoveg és igy nez ki egy kulcs \n <div>\n\t html \n</div>',
        },
        {
          title: 'second text',
          content:
            '2 ez egy szoveg és igy nez ki egy kulcs \n <div>\n\t html \n</div>',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
