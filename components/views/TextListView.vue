<template>
  <div v-if="list" class="row">
    <div class="col-3 border-end">
      <ol class="list-container ms-4">
        <li
          v-for="(data, key) in list"
          :key="key"
          :class="{ active: key === selected }"
        >
          <div class="data-btn" @click="setSelect(key)">
            {{ data.title }}
          </div>
        </li>
      </ol>
    </div>
    <div class="col-6">
      <text-view :text="list[selected].content" highlight="egy,kulcs" />
    </div>
  </div>
</template>

<script>
import TextView from '@/components/views/TextView'
export default {
  name: 'TextListView',
  components: { TextView },
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
  methods: {
    setSelect(index) {
      this.selected = index
    },
  },
}
</script>

<style scoped>
.list-container .active {
  color: #0a53be;
}

.list-container {
  margin-right: 25px;
}

.list-container li {
  cursor: pointer;
}
</style>
