<template>
  <div>
    <hero-bar>
      {{ $t('menu.projects') }}
      <!--      <nuxt-link slot="right" to="/project/create" class="button is-primary">-->
      <!--        <b-icon icon="file-plus" custom-size="default" />-->
      <!--        <span>{{ $t('buttons.newProject') }}</span>-->
      <!--      </nuxt-link>-->
      <button slot="right" class="button is-primary" @click="newProject">
        <b-icon icon="file-plus" custom-size="default" />
        <span>{{ $t('buttons.newProject') }}</span>
      </button>
    </hero-bar>
    <section v-if="result" class="section is-main-section">
      <card-component :title="$t('buttons.search')" icon="ballot">
        <search-input @search="searchProject" @reset="loadProjects(1)" />
      </card-component>
      <project-list-witch-images v-model="result.projects" />
      <pagination
        :current-page="currentPage"
        :params="pagination"
        @select="selectPage"
      />
    </section>
  </div>
</template>

<script>
import CardComponent from '~/components/default/card/CardComponent'
import Pagination from '~/components/inputs/Pagination'
import SearchInput from '~/components/inputs/SearchInput'
import HeroBar from '~/components/default/bar/HeroBar'
import ProjectListWitchImages from '~/components/views/ProjectListWitchImages'
import ProjectModal from '~/components/modal/ProjectModal'

export default {
  name: 'ProjectList',
  components: {
    CardComponent,
    Pagination,
    SearchInput,
    HeroBar,
    ProjectListWitchImages,
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
  mounted() {
    this.loadProjects(1)
  },
  methods: {
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

    loadProjects(page) {
      this.$projectApiRepository.getProjectList(page).then((response) => {
        this.result = response
      })
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
