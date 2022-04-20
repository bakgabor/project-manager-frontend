<template>
  <div>
    <client-only v-if="json">
      <json-viewer
        :value="json"
        :expand-depth="5"
        copyable
        :boxed="boxed"
        sort
        theme="json-view-theme"
      ></json-viewer>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'JsonView',
  props: {
    json: {
      type: Object,
      default: null,
    },
    boxed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
