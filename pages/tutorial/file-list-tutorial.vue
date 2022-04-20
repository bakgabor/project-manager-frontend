<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Search" icon="ballot">
        <search-input @search="searchFile" @reset="loadFiles(1)" />
      </card-component>
      <card-component title="File list" icon="ballot">
        <file-list-view v-model="files" />
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
import FileListView from '@/components/views/FileListView'
import Pagination from '@/components/inputs/Pagination'
import SearchInput from '@/components/inputs/SearchInput'

export default {
  name: 'file-list-tutorial',
  components: { CardComponent, FileListView, Pagination, SearchInput },
  data() {
    return {
      files: [],
      pagination: {
        maxPage: 1,
        visiblePage: 5,
        maxVisiblePage: 5,
      },
      currentPage: 1,
    }
  },
  mounted() {
    this.loadFiles(1)
  },
  methods: {
    selectPage(page) {
      this.currentPage = page
      this.loadFiles(page)
    },

    searchFile(text) {
      text = btoa(text)
      this.$fileApiRepository
        .search(text, 1)
        .then((response) => {
          this.files = response.files
          this.pagination.maxPage = response.maxPerPage
          console.log(response)
        })
        .catch(() => {
          this.showErrorMessage()
        })
    },

    loadFiles(page) {
      this.$fileApiRepository
        .getFileList(page)
        .then((response) => {
          this.files = response.files
          this.pagination.maxPage = response.maxPerPage
          console.log(response)
        })
        .catch(() => {
          this.showErrorMessage()
        })
    },
  },
}
</script>
<style scoped></style>
