export default (axios) => ({
  getProjectList(page) {
    return axios.$get('/api/project/list/' + page)
  },

  searchProject(page, words) {
    return axios.$get('/api/project/search/' + page + '/' + words)
  },

  getMainProjectList() {
    return axios.$get('/api/project/main')
  },

  create(project) {
    return axios.$post('/api/project/create', project)
  },

  getProject(id) {
    return axios.$get('/api/project/data/' + id)
  },

  updateProject(project) {
    return axios.$post('/api/project/update', project)
  },

  changeMainProject(id) {
    return axios.$get('/api/project/change/' + id)
  },
})
