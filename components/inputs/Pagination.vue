<template>
  <div v-if="params.maxPage > 1" class="paginator">
    <div
      v-if="params.maxPage > params.visiblePage"
      @click="first"
      class="page-item"
    >
      &lt;
    </div>
    <div v-for="index in params.visiblePage" :key="index" class="page-item">
      <div v-if="checkCurrentPage(index)" class="selected">
        <span>{{ currentPage }}</span>
      </div>
      <div v-if="!checkCurrentPage(index)">
        <div @click="selectPage(getPageNumber(index))">
          {{ getPageNumber(index) }}
        </div>
      </div>
    </div>
    <div
      v-if="params.maxPage > params.visiblePage"
      @click="last"
      class="page-item"
    >
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          maxPage: 6,
          visiblePage: 5,
          maxVisiblePage: 5,
        }
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageNumber: {
        index: null,
        value: null,
      },
    }
  },
  mounted() {
    if (this.params.maxPage < this.params.maxVisiblePage) {
      this.params.visiblePage = this.params.maxPage
    }
  },
  methods: {
    getPageNumber(index) {
      if (index === this.pageNumber.index) return this.pageNumber.value
      const startPage = this.checkMaxPage(this.currentPage + index)
      index = startPage + index
      this.pageNumber.value = index
      return index
    },

    first() {
      this.$emit('select', 1)
    },

    last() {
      this.$emit('select', this.params.maxPage)
    },

    selectPage(page) {
      this.$emit('select', page)
    },

    checkMaxPage() {
      const halfVisible = Math.ceil(this.params.visiblePage / 2)
      if (this.currentPage > this.params.maxPage - halfVisible) {
        return this.params.maxPage - this.params.visiblePage
      }
      if (this.currentPage < halfVisible) {
        return 0
      }
      return this.currentPage - halfVisible
    },

    checkCurrentPage(index) {
      return parseInt(this.getPageNumber(index)) === parseInt(this.currentPage)
    },
  },
}
</script>

<style scoped>
.page-item {
  margin: 10px;
  color: #0a53be;
  cursor: pointer;
}

.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.selected {
  color: black;
}
</style>
