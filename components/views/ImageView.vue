<template>
  <div class="row mb-5">
    <div
      @click="select(image)"
      v-for="(image, index) in localFiles"
      :key="index"
      class="col-3 pointer-event"
    >
      <card-image
        @remove="removeImage(index)"
        :title="image.title"
        icon="file-image"
        class="tile is-child"
      >
        <div class="img-container">
          <a :href="image.url" target="_blank">
            <img :src="image.url" alt="lorem" />
          </a>
        </div>
      </card-image>
    </div>
  </div>
</template>

<script>
import CardImage from '@/components/default/card/CardImage'

export default {
  name: 'ImageView',
  components: { CardImage },
  model: {
    prop: 'files',
    event: 'change',
  },
  props: {
    files: {
      type: Array,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    localFiles: {
      get() {
        return this.files
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    select(image) {
      this.$emit('select', image)
    },

    removeImage(index) {
      this.localFiles.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.img-container {
  height: 200px;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.pointer-event {
  cursor: pointer;
}
</style>
