<template>
  <form @submit.stop.prevent="addWords">
    <div v-if="title">
      <span>{{ title }}</span>
    </div>
    <div class="row">
      <div class="col-10">
        <input v-model="wordField" type="text" @blur="addWords" />
      </div>
      <div class="col-2">
        <button type="submit" class="button is-primary" @submit="addWords">
          <span> {{ $t('buttons.add') }} </span>
        </button>
      </div>
    </div>
    <div>
      <span
        v-for="(word, index) in localKeys"
        class="word me-2 mt-2"
        @click="deleteWord(index)"
        :key="index"
      >
        {{ word }}
      </span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'KeyEditor',
  model: {
    prop: 'keys',
    event: 'change',
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    keys: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      wordField: '',
    }
  },
  computed: {
    localKeys: {
      get() {
        return this.keys
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    deleteWord(index) {
      this.localKeys.splice(index, 1)
    },

    addWords() {
      this.wordField = this.wordField.replaceAll(' ', ',')
      const wordsArray = this.wordField.split(',')
      wordsArray.forEach((element) => {
        if (element !== '') {
          // this.localKeys.push(element)
          this.addElement(element)
        }
      })
      this.wordField = ''
    },

    addElement(keyword) {
      let error = false
      this.localKeys.forEach((element) => {
        if (keyword === element) {
          error = true
        }
      })
      if (error) {
        return
      }
      this.localKeys.push(keyword)
    },
  },
}
</script>

<style scoped>
.btn-search {
  margin-top: 10px;
}

.word {
  cursor: pointer;
  border: 1px solid #ccc;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 20px;
  display: inline-block;
}

input {
  height: 32px;
  width: 100%;
  margin-top: 3px;
}
</style>
