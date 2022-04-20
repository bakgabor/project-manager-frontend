<template>
  <div>
    <hero-bar>
      {{ $t('menu.projects') }}
      <button slot="right" class="button is-primary" @click="newProject">
        <b-icon icon="file-plus" custom-size="default" />
        <span>{{ $t('buttons.newProject') }}</span>
      </button>
    </hero-bar>
    <section class="section is-main-section">
      <card-component :title="$t('buttons.search')" icon="ballot">
        <search-input @search="searchProject" @reset="loadProjects(1)" />
      </card-component>
      <card-component
        v-if="result"
        :title="$t('card.projectList')"
        icon="ballot"
      >
        <project-list-view :projects="result.projects" />
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
import CardComponent from '~/components/default/card/CardComponent'
import Pagination from '~/components/inputs/Pagination'
import SearchInput from '~/components/inputs/SearchInput'
import ProjectListView from '~/components/views/ProjectListView'
import HeroBar from '~/components/default/bar/HeroBar'
import ProjectModal from '~/components/modal/ProjectModal'

export default {
  name: 'project-list',
  components: {
    CardComponent,
    Pagination,
    SearchInput,
    ProjectListView,
    HeroBar,
  },
  mounted() {
    this.loadProjects(1)
  },
  data() {
    return {
      result: null,
      currentPage: 1,
      pagination: {
        maxPage: 1,
        visiblePage: 5,
        maxVisiblePage: 5,
      },
    }
  },
  methods: {
    loadProjects(page) {
      this.$projectApiRepository.getProjectList(page).then((response) => {
        this.result = response
      })
    },

    newProject() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: ProjectModal,
        hasModalCard: true,
        trapFocus: true,
        events: {
          submit(data) {
            self.createProject(data)
          },
        },
      })
    },

    createProject(project) {
      this.$projectApiRepository
        .create(project)
        .then((response) => {
          this.$router.push('/project/page/' + response.id)
        })
        .catch(() => {})
    },

    searchProject(text) {
      text = btoa(text)
      this.$projectApiRepository.searchProject(1, text).then((response) => {
        this.result = response
      })
    },

    selectPage() {},
  },
}
</script>

<style scoped></style>
