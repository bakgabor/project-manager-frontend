export default (ctx) => ({
  copyToClipboardText(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    // text area method
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    // make the textarea out of viewport
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    // eslint-disable-next-line promise/param-names
    return new Promise((res, rej) => {
      // here the magic happens
      // eslint-disable-next-line prefer-promise-reject-errors
      document.execCommand('copy') ? res() : rej()
      textArea.remove()
    })
  },
})
