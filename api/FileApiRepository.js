export default (axios) => ({
  saveFile(data) {
    return axios.$post('/api/file/save', data)
  },

  getFileList(page) {
    return axios.$get('/api/file/list/' + page)
  },

  search(text, page) {
    return axios.$get('/api/file/search/' + page + '/' + text)
  },

  downloadFile(type, id) {
    return axios.request({
      url: '/api/file/' + type + '/' + id,
      method: 'GET',
      responseType: 'blob',
    })
  },
})
