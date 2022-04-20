export default (ctx) => ({
  comment: new RegExp(/\/\/.*?(?=<br>)/g),
  number: new RegExp(/(?:\d+(?:\.\d*)?|\.\d+)/g),
  stringDouble: new RegExp(/"(.*?)"/g),
  stringSingle: new RegExp(/'(.*?)'/g),
  tag: new RegExp(/&lt;(.*?)&gt;/g),

  textToHtml(text, tagReplace = true) {
    // eslint-disable-next-line no-control-regex
    const newLine = RegExp('\n', 'g')
    // eslint-disable-next-line no-control-regex
    const tab = RegExp('\t', 'g')
    const htmlOpen = RegExp('<', 'g')
    const htmlClouse = RegExp('>', 'g')

    const htmlCharCodeStart = RegExp('&', 'g')

    if (tagReplace) {
      text = text.replace(htmlCharCodeStart, '&amp;')
      text = text.replace(htmlOpen, '&lt;')
      text = text.replace(htmlClouse, '&gt;')
    }

    text = text.replace(newLine, '<br>')
    text = text.replace(tab, '&nbsp;&nbsp;&nbsp;&nbsp;')
    return text
  },

  createHighlight(text, highlight) {
    let dataArray = []
    if (highlight) {
      dataArray = highlight.split(',')
    }
    return this.addHighlight(text, dataArray)
  },

  addHighlight(text, words) {
    text = this.createWorlds(text, words)

    text = text.replace(this.tag, (word) => '<tag>' + word + '</tag>')
    text = text.replace(this.number, (word) => '<int>' + word + '</int>')
    text = text.replace(this.stringDouble, (word) => '<str>' + word + '</str>')
    text = text.replace(this.stringSingle, (word) => '<str>' + word + '</str>')
    text = text.replace(this.comment, (word) => '<kom>' + word + '</kom>')

    return text
  },

  concatenate(text) {
    text = text.replace(this.comment, (word) => '<kom>' + word + '</kom>')
    return text
  },

  createWorlds(text, words) {
    if (!words) return text
    words.forEach((word) => {
      text = this.replace(text, word)
    })
    return text
  },

  replace(text, word) {
    const regex = new RegExp('((?<=\\W)(' + word + ')(?=\\W))', 'g')
    text = ' ' + text + ' '
    text = text.replace(regex, '<op>' + word + '</op>')
    return text
  },
})
