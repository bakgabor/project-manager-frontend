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
      <div class="ms-2 mt-1" v-for="(data, key) in buttons" :key="key">
        <div
          v-if="data.visible && data.type === 'icon'"
          class="copy-btn mt-1"
          @click="createEvent(data)"
        >
          <b-icon :icon="data.class" custom-size="default pointer-event" />
        </div>
        <button
          v-if="data.visible && data.type !== 'icon'"
          type="button"
          :class="'button ' + data.class"
          @click="createEvent(data)"
        >
          <span> {{ data.title }} </span>
        </button>
      </div>
    </header>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
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
    buttons: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    createEvent(data) {
      this.$emit(data.emit)
    },

    headerIconClick() {
      this.$emit('header-icon-click')
    },

    removeImage() {
      this.$emit('remove')
    },
  },
}
</script>
