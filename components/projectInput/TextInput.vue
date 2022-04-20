<template>
  <project-card-component
    :title="title"
    icon="file-image"
    class="tile is-child"
    @edit="edit"
  >
    <div>
      <text-view :text="localText" />
    </div>
  </project-card-component>
</template>

<script>
import ProjectCardComponent from '@/components/default/card/ProjectCardComponent'
import TextView from '~/components/views/TextView'
import TextModal from '~/components/modal/TextModal'

export default {
  name: 'TextInput',
  components: {
    TextView,
    ProjectCardComponent,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'text',
    event: 'change',
  },
  computed: {
    localText: {
      get() {
        return this.text
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    edit() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: TextModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          title: this.title,
          content: this.localText,
        },
        events: {
          submit(data) {
            self.localText = data
          },
        },
      })
    },
  },
}
</script>

<style scoped></style>
