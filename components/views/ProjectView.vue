<template>
  <div class="row">
    <div class="col-4">
      <card-component
        :title="$t('card.coverImage')"
        icon="file-image"
        class="tile is-child"
      >
        <a :href="project.coverImage" target="_blank">
          <img :src="project.coverImage" />
        </a>
      </card-component>
    </div>
    <div class="col-4">
      <text-input
        v-model="project.jsonData.description"
        :title="$t('fields.description')"
      />
    </div>
    <div class="col-4">
      <url-list
        v-model="project.jsonData.url"
        :title="$t('card.externalContent')"
      />
    </div>
    <div class="col-6 mt-4">
      <string-list
        v-model="project.jsonData.stringList"
        :title="$t('card.textList')"
      />
    </div>
    <div class="col-6 mt-4">
      <multi-text-list-editor
        v-model="project.jsonData.documentation"
        :title="$t('card.documentation')"
      />
    </div>
    <div class="col-12 mt-4">
      <task-input
        v-model="project.jsonData.task"
        :title="$t('card.taskList')"
      />
    </div>
    <div class="col-12 mt-4">
      <image-view :files="project.jsonData.gallery" />
    </div>
    <div class="col-12 button-margin"></div>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import TextInput from '~/components/projectInput/TextInput'
import TaskInput from '~/components/inputs/card/TaskInput'
import StringList from '~/components/inputs/card/StringList'
import ImageView from '~/components/views/ImageView'
import MultiTextListEditor from '~/components/inputs/card/MultiTextListEditor'
import UrlList from '~/components/inputs/card/UrlList'

export default {
  name: 'ProjectView',
  components: {
    TextInput,
    CardComponent,
    TaskInput,
    StringList,
    ImageView,
    MultiTextListEditor,
    UrlList,
  },
  props: {
    project: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.button-margin {
  min-height: 50vh;
}
</style>
