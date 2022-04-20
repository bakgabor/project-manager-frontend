<template>
  <div class="editor-imput">
    <div class="dropbox">
      <input
        type="file"
        multiple
        name="file"
        class="input-file"
        @change="filesChange($event.target.name, $event.target.files)"
      />
      <p v-if="!fileName">
        Drag your file(s) here to begin<br />
        or click to browse
      </p>
      <p v-if="fileName">Uploading {{ fileName }} file...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  model: {
    prop: 'file',
    event: 'change',
  },
  props: {
    file: {
      type: Object,
      default: () => {
        return {
          fileList: null,
          fileName: null,
        }
      },
    },
  },
  data() {
    return {
      fileName: null,
    }
  },
  computed: {
    localFile: {
      get() {
        return this.file
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    filesChange(fieldName, fileList) {
      this.fileName = fileList[0].name
      this.localFile.fileList = fileList
      this.localFile.fileName = fieldName
      // this.localFile.formData = new FormData()
      // this.localFile.formData.append(fieldName, fileList[0], fileList[0].name)
    },
  },
}
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
