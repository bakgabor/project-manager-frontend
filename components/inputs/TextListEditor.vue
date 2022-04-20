<template>
  <div class="row">
    <div class="col-3 ms-4">
      <button type="button" class="button is-primary" @click="add">
        <span> {{ $t('buttons.add') }} </span>
      </button>
      <button
        v-if="checkData()"
        type="button"
        class="button is-danger"
        @click="remove"
      >
        <span> {{ $t('buttons.remove') }} </span>
      </button>
      <ol class="mt-4 list-container">
        <li
          v-for="(data, key) in localList"
          :key="key"
          :class="{ active: key === selected }"
        >
          <div class="data-btn" @click="setSelect(key)">
            {{ data.title }}
          </div>
        </li>
      </ol>
    </div>
    <div class="col-8">
      <input v-model="selectedTitle" type="text" class="list-title" />
      <text-editor v-model="selectedContent" />
    </div>
  </div>
</template>

<script>
import TextEditor from '@/components/inputs/TextEditor'
export default {
  name: 'TextListEditor',
  components: { TextEditor },
  model: {
    prop: 'list',
    event: 'change',
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      selected: 0,
    }
  },
  computed: {
    localList: {
      get() {
        return this.list
      },
      set(value) {
        this.$emit('change', value)
      },
    },
    selectedTitle: {
      get() {
        if (this.list.length > 0) {
          return this.list[this.selected].title
        }
        return ''
      },
      set(value) {
        if (this.list.length > 0) {
          this.list[this.selected].title = value
        }
      },
    },
    selectedContent: {
      get() {
        if (this.list.length > 0) {
          return this.list[this.selected].content
        }
        return ''
      },
      set(value) {
        if (this.list.length > 0) {
          this.list[this.selected].content = value
        }
      },
    },
  },
  methods: {
    add() {
      const time = new Date().getTime()
      this.localList.push({
        title: time,
        content: '',
      })
      this.selected = this.localList.length - 1
    },

    remove() {
      this.localList.splice(this.selected, 1)
      this.selected = this.localList.length - 1
    },

    setSelect(index) {
      this.selected = index
    },

    checkData() {
      return this.localList.length > 0
    },
  },
}
</script>

<style scoped>
.list-container .active {
  color: #0a53be;
}

.list-container li {
  cursor: pointer;
}

.list-title {
  width: 100%;
}
</style>
