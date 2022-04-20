<template>
  <div class="row mb-5">
    <div
      @click="select(data)"
      v-for="(data, index) in localFiles"
      :key="index"
      class="col-3 pointer-event mb-3"
    >
      <nuxt-link :to="'/project/page/' + data.id">
        <card-component
          @remove="removeImage(index)"
          :title="data.name"
          icon="file-image"
          class="tile is-child"
        >
          <div class="img-container">
            <img :src="getImage(data)" />
          </div>
        </card-component>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import CardComponent from '~/components/default/card/CardComponent'

export default {
  name: 'ImageView',
  components: { CardComponent },
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
    getImage(data) {
      if (data.coverImage) {
        return data.coverImage
      }
      return '/images/no-image.png'
    },

    select(data) {
      this.$emit('select', data)
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
