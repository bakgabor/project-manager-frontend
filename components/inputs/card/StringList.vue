<template>
  <card-with-buttons
    :buttons="buttons"
    :title="title"
    icon="file-image"
    class="tile is-child"
    @new="newItem"
  >
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="false"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="localList"
    >
      <template slot-scope="props">
        <b-table-column :label="$t('fields.name')" field="name" sortable>
          {{ props.row.title }}
        </b-table-column>
        <b-table-column :label="$t('fields.data')" field="data" sortable>
          {{ props.row.value }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              @click="copyToClipboard(props.row.value)"
              class="button is-small is-success"
            >
              <b-icon icon="content-copy" size="is-small" />
            </button>
            <button
              @click="deleteItem(props.index)"
              class="button is-small is-danger"
            >
              <b-icon icon="delete" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </card-with-buttons>
</template>

<script>
import DualStringModal from '~/components/modal/DualStringModal'
import CardWithButtons from '~/components/default/card/CardWithButtons'

export default {
  name: 'StringList',
  components: { CardWithButtons },
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
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      buttons: [
        {
          title: this.$t('buttons.newItem'),
          class: 'is-primary',
          emit: 'new',
          visible: true,
        },
      ],
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
    newItem() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: DualStringModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: this.$t('buttons.newItem'),
          firstTitle: this.$t('fields.title'),
          secondTitle: this.$t('fields.data'),
          checkFirstData: true,
          checkSecondData: true,
        },
        events: {
          submit(data) {
            self.addItem({
              title: data.firstData,
              value: data.secondData,
            })
          },
        },
      })
    },

    addItem(item) {
      if (item.title !== '') {
        this.localList.push(item)
      }
    },

    deleteItem(index) {
      this.$buefy.dialog.confirm({
        title: this.$t('main.delete'),
        message:
          this.$t('messages.deleteConfirm') + ' ' + this.localList[index].title,
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.delete'),
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => {
          this.localList.splice(index, 1)
        },
      })
    },

    copyToClipboard(data) {
      this.$simpleFunctions.copyToClipboardText(this.url).then(
        () => {
          this.$buefy.snackbar.open({
            message: this.$t('messages.copyToClipboard'),
            queue: false,
          })
        },
        () => {}
      )
    },
  },
}
</script>

<style scoped></style>
