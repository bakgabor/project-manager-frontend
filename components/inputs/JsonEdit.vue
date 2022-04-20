<template>
  <div>
    <client-only v-if="localJson">
      <JsonEditor v-model="localJson" :obj-data="localJson"></JsonEditor>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'JsonEdit',
  model: {
    prop: 'json',
    event: 'change',
  },
  props: {
    json: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    localJson: {
      get() {
        return this.json
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
}
</script>

<style scoped></style>
