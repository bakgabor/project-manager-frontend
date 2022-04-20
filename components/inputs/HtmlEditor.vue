<template>
  <div class="editor-container">
    <div class="toolbar">
      <button
        class="editor-button button-right fa fa-undo"
        @click="basicCommand('undo')"
      ></button>
      <button
        class="editor-button button-left fa fa-repeat"
        @click="basicCommand('redo')"
      ></button>

      <div class="fore-wrapper button-right">
        <i class="fa fa-font" style="color: #c96;"></i>
        <div class="fore-palette">
          <button
            v-for="(color, key) in colorPalette"
            :key="key"
            :style="createColorStyle(color)"
            class="color-button"
            @click="addColor('forecolor', color)"
          ></button>
        </div>
      </div>
      <div class="back-wrapper">
        <i class="fa fa-font" style="background: #c96;"></i>
        <div class="back-palette">
          <button
            v-for="(color, key) in colorPalette"
            :key="key"
            :style="createColorStyle(color)"
            class="color-button"
            @click="addColor('backcolor', color)"
          ></button>
        </div>
      </div>

      <button
        class="editor-button fa fa-bold"
        @click="basicCommand('bold')"
      ></button>
      <button
        class="editor-button fa fa-italic"
        @click="basicCommand('italic')"
      ></button>
      <button
        class="editor-button fa fa-underline"
        @click="basicCommand('underline')"
      ></button>
      <button
        class="editor-button button-left fa fa-strikethrough"
        @click="basicCommand('strikeThrough')"
      ></button>

      <button
        class="editor-button button-right fa fa-align-left"
        @click="basicCommand('justifyLeft')"
      ></button>
      <button
        class="editor-button fa fa-align-center"
        @click="basicCommand('justifyCenter')"
      ></button>
      <button
        class="editor-button fa fa-align-right"
        @click="basicCommand('justifyRight')"
      ></button>
      <button
        class="editor-button button-left fa fa-align-justify"
        @click="basicCommand('justifyFull')"
      ></button>

      <button
        class="editor-button button-right fa fa-indent"
        @click="basicCommand('justifyLeft')"
      ></button>
      <button
        class="editor-button button-left fa fa-outdent"
        @click="basicCommand('justifyCenter')"
      ></button>

      <button
        class="editor-button button-right fa fa-list-ul"
        @click="basicCommand('insertUnorderedList')"
      ></button>
      <button
        class="editor-button button-left fa fa-list-ol"
        @click="basicCommand('insertOrderedList')"
      ></button>
      <br />

      <button class="editor-button button-right" @click="addTag('op')">
        op
      </button>
      <button class="editor-button" @click="addTag('kom')">
        ko
      </button>
      <button class="editor-button" @click="addTag('str')">
        st
      </button>
      <button class="editor-button" @click="addTag('int')">
        in
      </button>
      <button class="editor-button button-left" @click="addTag('sel')">
        se
      </button>

      <button class="editor-button button-right" @click="formatCommand('h1')">
        h1
      </button>
      <button class="editor-button button-left" @click="formatCommand('h2')">
        h2
      </button>

      <button
        class="editor-button button-right fa fa-link"
        @click="asksUrl('createlink')"
      ></button>
      <button
        class="editor-button fa fa-unlink"
        @click="basicCommand('unlink')"
      ></button>
      <button
        class="editor-button fa fa-image"
        @click="showInsertImage"
      ></button>
      <button
        class="editor-button fas fa-images"
        @click="showInsertGallery"
      ></button>
      <button class="editor-button button-left" @click="formatCommand('p')">
        P
      </button>

      <button
        class="editor-button button-right fa fa-subscript"
        @click="basicCommand('subscript')"
      ></button>
      <button
        class="editor-button button-left fa fa-superscript"
        @click="basicCommand('superscript')"
      ></button>
    </div>
    <div
      id="editor"
      ref="editor"
      contenteditable
      @focus="focused = true"
      @blur="blurEditor"
      v-html="text"
    ></div>
    <image-modal :config="imageModalConfig" @accept="insertImage($event)" />
    <gallery-modal
      :config="galleryModalConfig"
      @accept="insertGalery($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'HTMLEditor',
  data() {
    return {
      imageModalConfig: {
        show: false,
      },
      galleryModalConfig: {
        show: false,
      },
      focused: false,
      selectionOffset: 0,
      focusNode: null,
      colorPalette: [
        '#000000',
        '#FF9966',
        '#6699FF',
        '#99FF66',
        '#CC0000',
        '#00CC00',
        '#0000CC',
        '#333333',
        '#0066FF',
        '#FFFFFF',
      ],
    }
  },
  methods: {
    insertImage(data) {
      this.$refs.editor.focus()
      this.setSelection()
      this.$htmlEditor.addImage(data)
    },

    insertGalery(data) {
      this.$refs.editor.focus()
      this.setSelection()
      this.addGallery(data)
    },

    showInsertGallery() {
      if (this.focused) {
        this.galleryModalConfig.show = true
        this.focusNode = document.getSelection().focusNode
        this.selectionOffset = document.getSelection().anchorOffset
      }
    },

    showInsertImage() {
      if (this.focused) {
        this.imageModalConfig.show = true
        this.focusNode = document.getSelection().focusNode
        this.selectionOffset = document.getSelection().anchorOffset
      }
    },

    createColorStyle(color) {
      return 'background-color: ' + color + ';'
    },

    blurEditor() {
      setTimeout(() => {
        this.focused = false
      }, 100)
    },

    setSelection() {
      const el = this.$refs.editor
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(this.focusNode, this.selectionOffset)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
      el.focus()
    },

    addTag(tag) {
      let txt = ''
      if (window.getSelection) {
        txt = window.getSelection()
      } else if (document.getSelection) {
        txt = document.getSelection()
      }
      txt = '<' + tag + '>' + txt + '</' + tag + '>'
      document.execCommand('insertHTML', false, txt)
    },

    formatCommand(command) {
      document.execCommand('formatBlock', false, command)
    },

    basicCommand(command) {
      document.execCommand(command, false)
    },

    asksUrl(command) {
      const url = prompt('Enter the link here: ', 'http://')
      document.execCommand(command, false, url)
    },

    addImage(image) {
      if (image.percent) {
        const html =
          '<img src="' + image.url + '" style=" width: ' + image.width + '%;">'
        document.execCommand('insertHTML', false, html)
        return
      }
      const html =
        '<img src="' +
        image.url +
        '" width="' +
        image.width +
        '" height="' +
        image.height +
        '">'
      document.execCommand('insertHTML', false, html)
    },

    addGallery(images) {
      let html = '<div class="row">'
      let grid = 'col'
      if (images.length > 3) {
        grid = 'col-4'
      }
      images.forEach((image) => {
        html += '<div class="' + grid + '">'
        html += '<img src="' + image.url + '">'
        html += '<spain>'
        html += image.title
        html += '</spain>'
        html += '</div>'
      })
      html += '</div>'
      document.execCommand('insertHTML', false, html)
    },

    addColor(command, color) {
      document.execCommand(command, false, color)
    },
  },
}
</script>

<style scoped></style>
