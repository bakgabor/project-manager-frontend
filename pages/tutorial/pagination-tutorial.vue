<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Text view" icon="ballot">
        <pagination
          :currentPage="currentPage"
          :params="pagination"
          @select="selectPage"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import Pagination from '@/components/inputs/Pagination'

export default {
  name: 'text-list-tutorial',
  components: { CardComponent, Pagination },
  data() {
    return {
      pagination: {
        maxPage: 6,
        visiblePage: 5,
        maxVisiblePage: 5,
      },
      currentPage: 1,
    }
  },
  methods: {
    selectPage(page) {
      this.currentPage = page
    },
  },
}
</script>
<style scoped></style>
