<template>
  <div>
    <hero-bar>
      {{ $t('menu.projects') }}
      <button slot="right" class="button is-primary" @click="newProject">
        <b-icon icon="file-plus" custom-size="default" />
        <span>{{ $t('buttons.newProject') }}</span>
      </button>
    </hero-bar>
    <section v-if="result" class="section is-main-section">
      <project-list-witch-images v-model="result" />
    </section>
  </div>
</template>

<script>
import HeroBar from '~/components/default/bar/HeroBar'
import ProjectListWitchImages from '~/components/views/ProjectListWitchImages'
import ProjectModal from '~/components/modal/ProjectModal'

export default {
  name: 'Home',
  components: {
    HeroBar,
    ProjectListWitchImages,
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
      this.$projectApiRepository.getMainProjectList(page).then((response) => {
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
  },
}
</script>
