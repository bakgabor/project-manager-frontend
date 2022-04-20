<template>
  <div>
    <hero-bar>
      {{ $t('buttons.newProject') }}
    </hero-bar>
    <section class="section is-main-section">
      <new-project @create="createProject" />
    </section>
  </div>
</template>

<script>
import HeroBar from '~/components/default/bar/HeroBar'
import NewProject from '~/components/forms/NewProject'

export default {
  name: 'project-list',
  components: {
    HeroBar,
    NewProject,
  },
  mounted() {},
  data() {
    return {}
  },
  methods: {
    createProject(project) {
      this.$projectApiRepository
        .create(project)
        .then((response) => {
          this.showSaveMessage()
          this.result = response
        })
        .catch(() => {
          this.showErrorMessage()
        })
    },

    showSaveMessage() {
      this.$buefy.snackbar.open({
        message: this.$t('main.saved'),
        type: 'is-success',
        position: 'is-top',
        queue: false,
      })
    },

    showErrorMessage() {
      this.$buefy.snackbar.open({
        message: this.$t('main.saveError'),
        type: 'is-danger',
        position: 'is-top',
        queue: false,
      })
    },
  },
}
</script>

<style scoped></style>
