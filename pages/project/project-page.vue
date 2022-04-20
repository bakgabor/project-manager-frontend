<template>
  <div v-if="project">
    <hero-bar>
      {{ $t('main.project') }} : {{ project.name }} -
      {{ $moment.unix(project.insertedAtTime).format('YYYY/MM/DD') }}
    </hero-bar>
    <hero-bar>
      <button slot="right" class="button me-3" @click="changeCoverImage">
        <b-icon icon="file-image" custom-size="default" />
        <span>{{ $t('buttons.changeCoverImage') }}</span>
      </button>
      <button slot="right" class="button me-3" @click="addImageToGallery">
        <b-icon icon="file-image" custom-size="default" />
        <span>{{ $t('buttons.addImageToGallery') }}</span>
      </button>
      <button @click="dataEdit" slot="right" class="button is-primary me-3">
        <b-icon icon="database" custom-size="default" />
        <span>{{ $t('buttons.dataEdit') }}</span>
      </button>
      <button @click="changeMainProject" slot="right" class="button is-primary">
        <b-icon icon="compass" custom-size="default" />
        <span v-if="!project.mainProject">{{
          $t('buttons.setMainProject')
        }}</span>
        <span v-if="project.mainProject">{{
          $t('buttons.noMainProject')
        }}</span>
      </button>
    </hero-bar>
    <section class="section is-main-section">
      <project-view :project="project" />
    </section>
  </div>
</template>

<script>
import HeroBar from '~/components/default/bar/HeroBar'
import ProjectView from '~/components/views/ProjectView'
import DualStringModal from '~/components/modal/DualStringModal'
import ProjectModal from '~/components/modal/ProjectModal'

export default {
  name: 'ProjectPage',
  components: {
    HeroBar,
    ProjectView,
  },
  data() {
    return {
      project: null,
    }
  },
  mounted() {
    this.loadProject()
  },
  watch: {
    project: {
      handler(newValue, oldValue) {
        if (oldValue) {
          this.saveProject()
        }
      },
      deep: true,
    },
  },
  methods: {
    changeMainProject() {
      this.project.mainProject = !this.project.mainProject
    },

    dataEdit() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: ProjectModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          name: this.project.name,
          keywords: this.project.keywords,
        },
        events: {
          submit(data) {
            self.project.name = data.name
            self.project.keywords = data.keywords
          },
        },
      })
    },

    saveProject() {
      this.$projectApiRepository
        .updateProject(this.project)
        .then((response) => {
          // this.$buefy.snackbar.open({
          //   message: this.$t('messages.saved'),
          //   position: 'is-top',
          //   queue: false,
          // })
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message: this.$t('messages.saveError'),
            type: 'is-danger',
            position: 'is-top',
            queue: false,
          })
        })
    },

    loadProject() {
      this.$projectApiRepository
        .getProject(this.$route.params.id)
        .then((response) => {
          if (!response.jsonData) {
            response.jsonData = this.createNewJson()
          }
          this.project = response
        })
        .catch(() => {})
    },

    changeCoverImage() {
      this.$buefy.dialog.prompt({
        message: this.$t('buttons.changeCoverImage'),
        inputAttrs: {
          maxlength: 2048,
        },
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.confirm'),
        onConfirm: (value) => {
          this.project.coverImage = value
        },
      })
    },

    addImageToGallery() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: DualStringModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: this.$t('buttons.addImageToGallery'),
          firstTitle: this.$t('fields.title'),
          secondTitle: this.$t('fields.url'),
          checkFirstData: true,
          checkSecondData: true,
        },
        events: {
          submit(data) {
            self.project.jsonData.gallery.push({
              title: data.firstData,
              url: data.secondData,
            })
          },
        },
      })

      // this.$buefy.modal.open({
      //   parent: this,
      //   component: GalleryModal,
      //   hasModalCard: true,
      //   customClass: 'custom-class custom-class-2',
      //   trapFocus: true,
      //   events: {
      //     submit(data) {
      //       self.project.jsonData.gallery.push(data)
      //     },
      //   },
      // })
    },

    createNewJson() {
      return {
        description: '',
        stringList: [],
        documentation: [],
        task: [],
        url: [],
        gallery: [],
      }
    },
  },
}
</script>

<style scoped></style>
