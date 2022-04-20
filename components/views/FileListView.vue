<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="false"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="localFiles"
    >
      <template slot-scope="props">
        <b-table-column label="Title" field="title" sortable>
          {{ props.row.title }}
        </b-table-column>
        <b-table-column label="Name" field="name" sortable>
          {{ props.row.originalName }}
        </b-table-column>
        <b-table-column label="Type" field="type" sortable>
          {{ props.row.mimeType }}
        </b-table-column>
        <b-table-column label="Updated" field="date" sortable>
          {{ $moment.unix(props.row.insertedAtTime).format('LL') }}
        </b-table-column>
        <b-table-column label="Updated" field="date" sortable>
          <a :href="props.row.url" :download="props.row.originalName">{{
            $t('buttons.download')
          }}</a>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'FileListView',
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
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
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
  methods: {},
}
</script>

<style scoped></style>
