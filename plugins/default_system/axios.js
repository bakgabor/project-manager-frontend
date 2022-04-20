export default (ctx) => {
  ctx.app.$axios.onError((error) => {
    if (error.response && error.response.status === 404) {
      return ctx.error({ statusCode: 404 })
    }
    if (error.response && error.response.status === 401) {
      ctx.app.$auth.logout()
    }
    return Promise.reject(error.response)
  })
}
