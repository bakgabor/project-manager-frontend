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
      :data="localList"
    >
      <template slot-scope="props">
        <b-table-column :label="$t('fields.name')" field="name" sortable>
          <div @click="select(props)" class="pointer-event">
            <b-checkbox v-model="props.row.completed"></b-checkbox>
            <div class="list-text">
              {{ props.row.task }}
            </div>
          </div>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              @click="question(props.index)"
              class="button is-small is-danger"
            >
              <b-icon icon="delete" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'TaskListView',
  model: {
    prop: 'list',
    event: 'change',
  },
  props: {
    list: {
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
    localList: {
      get() {
        return this.list
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    question(index) {
      this.$buefy.dialog.confirm({
        title: this.$t('main.delete'),
        message:
          this.$t('messages.deleteConfirm') + ' ' + this.localList[index].task,
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.delete'),
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => {
          this.deleteTask(index)
        },
      })
    },

    deleteTask(index) {
      this.localList.splice(index, 1)
      if (this.localList.length > 0) {
        this.$emit('select', this.localList[0])
        return
      }
      this.$emit('select', { index: -1 })
    },

    select(props) {
      this.$emit('select', props.index)
    },
  },
}
</script>

<style>
.b-checkbox.checkbox input[type='checkbox']:checked + .check {
  background-color: #7957d5 !important;
  border-color: #7957d5 !important;
}

.b-checkbox.checkbox:hover input[type='checkbox']:not(:disabled) + .check {
  border-color: #7957d5 !important;
}

.list-text {
  transform: translate(0, -5px);
  display: inline-block;
  cursor: pointer;
}

.pointer-event {
  cursor: pointer;
}
</style>
