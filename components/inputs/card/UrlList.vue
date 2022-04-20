<template>
  <card-with-buttons
    :buttons="buttons"
    :title="title"
    icon="file-image"
    class="tile is-child"
    @new="newItem"
  >
    <div v-for="(url, index) in localList" :key="index" class="row">
      <div class="col-10">
        <a :href="url.url" target="_blank">{{ url.text }}</a>
      </div>
      <div class="copy-btn col" @click="deleteItem(index)">
        <b-icon icon="delete" custom-size="default pointer-event" />
      </div>
    </div>
  </card-with-buttons>
</template>

<script>
import UrlModal from '~/components/modal/UrlModal'
import CardWithButtons from '~/components/default/card/CardWithButtons'

export default {
  name: 'UrlList',
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
        component: UrlModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: {
          submit(data) {
            self.addItem(data)
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
          this.$t('messages.deleteConfirm') + ' ' + this.localList[index].text,
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
  },
}
</script>

<style scoped></style>
