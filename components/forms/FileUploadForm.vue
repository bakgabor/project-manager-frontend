<template>
  <div>
    <b-field horizontal :label="$t('fields.title')" message="">
      <b-input v-model="uploadData.title" name="name" required />
    </b-field>
    <b-field horizontal :label="$t('fields.keywords')" message="">
      <key-editor v-model="uploadData.keywords" />
    </b-field>
    <b-field horizontal :label="$t('fields.description')" message="">
      <text-editor v-model="uploadData.description" :cols="82" />
    </b-field>
    <b-field :label="$t('fields.type')" horizontal>
      <b-select
        v-model="uploadData.type"
        placeholder="Select a department"
        required
      >
        <option
          v-for="(department, index) in types"
          :key="index"
          :value="department"
        >
          {{ department }}
        </option>
      </b-select>
    </b-field>
    <b-field horizontal :label="$t('fields.uploadFile')" message="">
      <file-upload v-model="uploadData.file" />
    </b-field>
    <b-field horizontal message="">
      <button type="button" class="button is-primary" @click="save">
        <span> {{ $t('buttons.save') }} </span>
      </button>
    </b-field>
  </div>
</template>

<script>
import FileUpload from '@/components/inputs/FileUpload'
import KeyEditor from '@/components/inputs/KeyEditor'
import TextEditor from '@/components/inputs/TextEditor'

export default {
  name: 'FileUploadForm',
  components: { FileUpload, KeyEditor, TextEditor },
  data() {
    return {
      uploadData: {
        title: '',
        keywords: [],
        description: '',
        type: 'public',
        file: {
          fileList: null,
          fileName: null,
        },
      },
      formData: null,
      types: ['public', 'private'],
    }
  },
  methods: {
    save() {
      if (!this.uploadData.file.fileName) {
        this.showSelectMessage()
        return
      }
      this.createFormData()
      this.$fileApiRepository
        .saveFile(this.formData)
        .then((response) => {
          this.showSaveMessage()
        })
        .catch(() => {
          this.showErrorMessage()
        })
    },

    createFormData() {
      const file = this.uploadData.file
      this.formData = new FormData()
      this.formData.append('file', file.fileList[0], file.fileList[0].name)
      this.formData.append('title', this.uploadData.title)
      this.formData.append('description', this.uploadData.description)
      this.formData.append('type', this.uploadData.type)
      this.formData.append('keywords', this.uploadData.keywords)
    },

    showSelectMessage() {
      this.$buefy.snackbar.open({
        message: 'Select file!',
        type: 'is-info',
        position: 'is-top',
        queue: false,
      })
    },

    showSaveMessage() {
      this.$buefy.snackbar.open({
        message: 'Saved!',
        type: 'is-success',
        position: 'is-top',
        queue: false,
      })
    },

    showErrorMessage() {
      this.$buefy.snackbar.open({
        message: 'Save error!',
        type: 'is-danger',
        position: 'is-top',
        queue: false,
      })
    },
  },
}
</script>

<style scoped></style>
