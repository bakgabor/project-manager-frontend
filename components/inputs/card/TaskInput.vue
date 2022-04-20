<template>
  <card-with-buttons
    :buttons="buttons"
    :title="title"
    icon="file-image"
    class="tile is-child"
    @new="newTask"
    @add="newTaskList"
    @remove="removeTaskList"
  >
    <ul class="nav nav-tabs" role="tablist">
      <li
        v-for="(task, index) in taskList"
        :key="index"
        class="nav-item"
        role="presentation"
      >
        <button
          :class="{ active: selectedList === index }"
          class="nav-link"
          type="button"
          role="tab"
          @click="selectTaskList(index)"
        >
          {{ task.name }}
        </button>
      </li>
    </ul>
    <div v-if="selectedList !== -1" class="row">
      <div class="col">
        <task-list-view
          v-model="taskList[selectedList].task"
          @select="selectTask"
        />
      </div>
      <div class="col mt-4">
        <div
          v-if="taskList[selectedList].task.length > 0"
          class="edit-btn"
          @click="editTask"
        >
          <b-icon icon="grease-pencil" custom-size="default pointer-event" />
        </div>
        <text-view
          v-if="selectedTaskData"
          :text="selectedTaskData.description"
        />
      </div>
    </div>
  </card-with-buttons>
</template>

<script>
import TaskListView from '~/components/views/TaskListView'
import TextAndTitleModal from '~/components/modal/TextAndTitleModal'
import CardWithButtons from '~/components/default/card/CardWithButtons'
import TextView from '~/components/views/TextView'

export default {
  name: 'TaskInput',
  components: {
    TaskListView,
    CardWithButtons,
    TextView,
  },
  model: {
    prop: 'taskList',
    event: 'change',
  },
  props: {
    taskList: {
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
      taskText: '',
      selectedList: -1,
      selectedTask: -1,
      buttons: [
        {
          title: this.$t('buttons.newTask'),
          class: 'is-primary',
          emit: 'new',
          visible: false,
        },
        {
          title: this.$t('buttons.taskListAdd'),
          class: 'is-primary',
          emit: 'add',
          visible: true,
        },
        {
          title: this.$t('buttons.taskListDelete'),
          class: 'is-danger',
          emit: 'remove',
          visible: false,
        },
      ],
    }
  },
  computed: {
    localTaskList: {
      get() {
        return this.taskList
      },
      set(value) {
        this.$emit('change', value)
      },
    },
    selectedTaskData: {
      get() {
        if (this.selectedTask !== -1) {
          return this.localTaskList[this.selectedList].task[this.selectedTask]
        }
        return null
      },
    },
  },
  mounted() {
    this.checkButtonsVisible()
    this.selectFirstTaskList()
  },
  methods: {
    newTask() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: TextAndTitleModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: this.$t('fields.newTask'),
          firstTitle: this.$t('fields.task'),
          secondTitle: this.$t('fields.description'),
          checkFirstData: true,
        },
        events: {
          submit(data) {
            self.localTaskList[self.selectedList].task.push({
              task: data.firstData,
              description: data.secondData,
              completed: false,
            })
            self.selectLastTask()
          },
        },
      })
    },

    editTask() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: TextAndTitleModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: this.$t('fields.newTask'),
          firstTitle: this.$t('fields.task'),
          secondTitle: this.$t('fields.description'),
          checkFirstData: true,
          firstData: this.selectedTaskData.task,
          secondData: this.selectedTaskData.description,
        },
        events: {
          submit(data) {
            self.localTaskList[self.selectedList].task[self.selectedTask].task =
              data.firstData
            self.localTaskList[self.selectedList].task[
              self.selectedTask
            ].description = data.secondData
          },
        },
      })
    },

    removeTaskList() {
      this.$buefy.dialog.confirm({
        title: this.$t('main.delete'),
        message:
          this.$t('messages.deleteConfirm') +
          ' ' +
          this.localTaskList[this.selectedList].name,
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.delete'),
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => {
          this.localTaskList.splice(this.selectedList, 1)
          this.selectLastTaskList()
        },
      })
    },

    newTaskList() {
      this.$buefy.dialog.prompt({
        message: this.$t('buttons.taskListAdd'),
        inputAttrs: {
          maxlength: 50,
        },
        trapFocus: true,
        cancelText: this.$t('main.cancel'),
        confirmText: this.$t('main.confirm'),
        onConfirm: (value) => {
          this.localTaskList.push({
            name: value,
            description: '',
            task: [],
          })
          this.selectLastTaskList()
        },
      })
    },

    selectTask(index) {
      this.selectedTask = index
    },

    selectTaskList(index) {
      this.selectedList = index
      this.selectFirstTask()
    },

    selectFirstTask() {
      if (
        this.localTaskList[this.selectedList] &&
        this.localTaskList[this.selectedList].task.length > 0
      ) {
        this.selectedTask = 0
      }
    },

    selectLastTask() {
      this.selectedTask = this.localTaskList[this.selectedList].task.length - 1
    },

    selectFirstTaskList() {
      if (this.localTaskList.length > 0) {
        this.selectTaskList(0)
      }
      this.checkButtonsVisible()
    },

    selectLastTaskList() {
      this.selectTaskList(this.localTaskList.length - 1)
      this.checkButtonsVisible()
    },

    checkButtonsVisible() {
      if (this.selectedList === -1) {
        this.buttons[0].visible = false
        this.buttons[2].visible = false
        return
      }
      this.buttons[0].visible = true
      this.buttons[2].visible = true
    },
  },
}
</script>

<style scoped>
.edit-btn {
  float: right;
}
</style>
