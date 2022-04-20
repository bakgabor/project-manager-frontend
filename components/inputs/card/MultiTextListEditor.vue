<template>
  <card-with-buttons
    :buttons="buttons"
    :title="title"
    icon="file-image"
    class="tile is-child"
    @newList="newList"
    @newDocument="newDocument"
    @removeList="removeList"
  >
    <ul class="nav nav-tabs" role="tablist">
      <li
        v-for="(document, index) in localList"
        :key="index"
        class="nav-item"
        role="presentation"
      >
        <button
          :class="{ active: selectedList === index }"
          class="nav-link"
          type="button"
          role="tab"
          @click="selectList(index)"
        >
          {{ document.name }}
        </button>
      </li>
    </ul>
    <div v-if="selectedList !== -1" class="row">
      <div class="col-3 ms-4">
        <ol class="mt-4 list-container">
          <li
            v-for="(data, key) in localList[selectedList].documents"
            :key="key"
            :class="{ active: key === selectedDocument }"
          >
            <div class="data-btn" @click="selectDocument(key)">
              {{ data.title }}
            </div>
          </li>
        </ol>
      </div>
      <div v-if="selectedDocument !== -1" class="col-8">
        <div class="copy-btn mt-2" @click="removeDocument">
          <b-icon icon="delete" custom-size="default pointer-event" />
        </div>
        <div class="copy-btn mt-2" @click="editDocument">
          <b-icon icon="grease-pencil" custom-size="default pointer-event" />
        </div>
        <h1>
          {{ localList[selectedList].documents[selectedDocument].title }}
        </h1>
        <div>
          <text-view
            :text="localList[selectedList].documents[selectedDocument].content"
          />
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
  name: 'MultiTextListEditor',
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
      selectedList: -1,
      selectedDocument: -1,
      buttons: [
        {
          title: this.$t('buttons.newList'),
          class: 'is-primary',
          emit: 'newList',
          visible: true,
        },
        {
          title: this.$t('fields.newDocumentation'),
          class: 'is-primary',
          emit: 'newDocument',
          visible: false,
        },
        {
          title: this.$t('buttons.removeList'),
          class: 'is-danger',
          emit: 'removeList',
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
  },
  mounted() {
    this.checkButtonsVisible()
    this.selectFirstList()
  },
  methods: {
    selectList(index) {
      this.selectedList = index
      this.selectFirstDocument()
    },

    selectDocument(index) {
      this.selectedDocument = index
    },

    selectFirstDocument() {
      if (this.localList[this.selectedList].documents.length > 0) {
        this.selectDocument(0)
        return
      }
      this.selectDocument(-1)
    },

    selectLastList() {
      this.selectList(this.localList.length - 1)
      this.checkButtonsVisible()
    },

    selectFirstList() {
      if (this.localList.length > 0) {
        this.selectList(0)
        this.checkButtonsVisible()
        return
      }
      this.selectedList = -1
      this.checkButtonsVisible()
    },

    selectLastDocument() {
      this.selectedDocument =
        this.localList[this.selectedList].documents.length - 1
      // localList[selectedList].documents[selectedDocument].content
    },

    newList() {
      this.$buefy.dialog.prompt({
        message: this.$t('buttons.taskListAdd'),
        inputAttrs: {
          maxlength: 50,
        },
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.confirm'),
        onConfirm: (value) => {
          this.localList.push({
            name: value,
            documents: [],
          })
          this.selectLastList()
        },
      })
    },

    newDocument() {
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
            self.localList[self.selectedList].documents.push({
              title: data.firstData,
              content: data.secondData,
            })
            self.selectLastDocument()
          },
        },
      })
    },

    editDocument() {
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
          firstData: this.localList[this.selectedList].documents[
            this.selectedDocument
          ].title,
          secondData: this.localList[this.selectedList].documents[
            this.selectedDocument
          ].content,
        },
        events: {
          submit(data) {
            self.localList[self.selectedList].documents[
              self.selectedDocument
            ].title = data.firstData
            self.localList[self.selectedList].documents[
              self.selectedDocument
            ].content = data.secondData
          },
        },
      })
    },

    removeDocument() {
      this.$buefy.dialog.confirm({
        title: this.$t('main.delete'),
        message:
          this.$t('messages.deleteConfirm') +
          ' ' +
          this.localList[this.selectedList].documents[this.selectedDocument]
            .title,
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.delete'),
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => {
          this.localList[this.selectedList].documents.splice(
            this.selectedDocument,
            1
          )
          this.selectFirstDocument()
        },
      })
    },

    removeList() {
      this.$buefy.dialog.confirm({
        title: this.$t('main.delete'),
        message: this.$t('messages.deleteConfirm') + ' ' + this.selectedTitle,
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.delete'),
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => {
          this.localList.splice(this.selectedList, 1)
          this.selectFirstList()
        },
      })
    },

    checkButtonsVisible() {
      if (this.selectedList === -1) {
        this.buttons[1].visible = false
        this.buttons[2].visible = false
        return
      }
      this.buttons[1].visible = true
      this.buttons[2].visible = true
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
