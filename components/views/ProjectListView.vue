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
      :data="projects"
    >
      <template slot-scope="props">
        <b-table-column :label="$t('fields.name')" field="name" sortable>
          <nuxt-link
            :to="'/project/page/' + props.row.id"
            class="navbar-item"
            exact-active-class="is-active"
          >
            {{ props.row.name }}
          </nuxt-link>
        </b-table-column>
        <b-table-column :label="$t('fields.created')" field="date" sortable>
          {{ $moment.unix(props.row.insertedAtTime).format('YYYY/MM/DD') }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <nuxt-link
              :to="'/project/page/' + props.row.id"
              class="button is-small is-primary"
            >
              <b-icon icon="book-open-variant" size="is-small" />
            </nuxt-link>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectListView',
  props: {
    projects: {
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
  methods: {},
}
</script>

<style scoped></style>
