<template>
  <form @submit.stop.prevent="search" class="row">
    <div class="col-10">
      <b-input v-model="searchText" name="search" />
    </div>
    <div class="col-2">
      <button type="submit" class="button is-primary">
        <span> {{ $t('buttons.search') }} </span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchText: '',
    }
  },
  watch: {
    searchText() {
      if (this.searchText === '') {
        this.$emit('reset')
      }
    },
  },
  methods: {
    search() {
      if (this.searchText !== '') {
        this.$emit('search', this.searchText)
      }
    },
  },
}
</script>

<style scoped></style>
