<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default" />
        {{ title }}
      </p>
      <a
        v-if="headerIcon"
        href="#"
        class="card-header-icon"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <b-icon :icon="headerIcon" custom-size="default" />
      </a>
      <div @click="edit" class="buttons is-right">
        <b-icon icon="grease-pencil" size="is-small" />
      </div>
    </header>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCardComponent',
  props: {
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    headerIcon: {
      type: String,
      default: null,
    },
  },
  methods: {
    edit() {
      this.$emit('edit')
    },

    headerIconClick() {
      this.$emit('header-icon-click')
    },
  },
}
</script>
