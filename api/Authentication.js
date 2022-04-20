export default (axios) => ({
  signup(data) {
    return axios.$post('/api/authentication/signup', data)
  },
})
