<template>
  <card-with-buttons
    :buttons="buttons"
    :title="title"
    icon="file-image"
    class="tile is-child"
    @add="add"
    @remove="remove"
  >
    <div class="row">
      <div class="col-3 ms-4">
        <ol class="mt-4 list-container">
          <li
            v-for="(data, key) in localList"
            :key="key"
            :class="{ active: key === selected }"
          >
            <div class="data-btn" @click="setSelect(key)">
              {{ data.title }}
            </div>
          </li>
        </ol>
      </div>
      <div class="col-8">
        <div @click="edit" v-if="selected !== -1" class="copy-btn">
          <b-icon icon="grease-pencil" custom-size="default pointer-event" />
        </div>
        <h1>{{ selectedTitle }}</h1>
        <div>
          <text-view :text="selectedContent" />
        </div>
      </div>
    </div>
  </card-with-buttons>
</template>

<script>
import TextAndTitleModal from '~/components/modal/TextAndTitleModal'
import TextView from '~/components/views/TextView'
import CardWithButtons from '~/components/default/card/CardWithButtons'

export default {
  name: 'TextListEditor',
  components: { TextView, CardWithButtons },
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
      selected: this.firstSelection(),
      buttons: [
        {
          title: this.$t('buttons.add'),
          class: 'is-primary',
          emit: 'add',
          visible: true,
        },
        {
          title: this.$t('buttons.remove'),
          class: 'is-danger',
          emit: 'remove',
          visible: false,
        },
      ],
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
    selectedTitle: {
      get() {
        if (this.list.length > 0) {
          return this.list[this.selected].title
        }
        return ''
      },
      set(value) {
        if (this.list.length > 0) {
          this.list[this.selected].title = value
        }
      },
    },
    selectedContent: {
      get() {
        if (this.list.length > 0) {
          return this.list[this.selected].content
        }
        return ''
      },
      set(value) {
        if (this.list.length > 0) {
          this.list[this.selected].content = value
        }
      },
    },
  },
  mounted() {
    this.checkButtonsVisible()
  },
  methods: {
    add() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: TextAndTitleModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: this.$t('fields.newDocumentation'),
          firstTitle: this.$t('fields.title'),
          secondTitle: this.$t('card.documentation'),
          checkFirstData: true,
        },
        events: {
          submit(data) {
            self.localList.push({
              title: data.firstData,
              content: data.secondData,
            })
            self.refreshSelection()
          },
        },
      })
    },

    edit() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: TextAndTitleModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: this.$t('fields.newDocumentation'),
          firstTitle: this.$t('fields.title'),
          secondTitle: this.$t('card.documentation'),
          checkFirstData: true,
          firstData: this.selectedTitle,
          secondData: this.selectedContent,
        },
        events: {
          submit(data) {
            self.selectedTitle = data.firstData
            self.selectedContent = data.secondData
          },
        },
      })
    },

    remove() {
      this.$buefy.dialog.confirm({
        title: this.$t('main.delete'),
        message: this.$t('messages.deleteConfirm') + ' ' + this.selectedTitle,
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.delete'),
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => {
          this.localList.splice(this.selected, 1)
          this.refreshSelection()
        },
      })
    },

    setSelect(index) {
      this.selected = index
    },

    checkData() {
      return this.localList.length > 0
    },

    firstSelection() {
      if (this.list.length > 0) {
        return 0
      }
      return -1
    },

    checkButtonsVisible() {
      if (this.selected === -1) {
        this.buttons[1].visible = false
        return
      }
      this.buttons[1].visible = true
    },

    refreshSelection() {
      this.selected = this.localList.length - 1
      this.checkButtonsVisible()
    },
  },
}
</script>

<style scoped>
.list-container .active {
  color: #0a53be;
}

.list-container li {
  cursor: pointer;
}

.list-title {
  width: 100%;
}

.copy-btn {
  float: right;
}
</style>
