import Authentication from '~/api/Authentication'
import FileApiRepository from '~/api/FileApiRepository'
import ProjectApiRepository from '~/api/ProjectApiRepository'

export default (ctx, inject) => {
  const authentication = Authentication(ctx.$axios)
  const fileApiRepository = FileApiRepository(ctx.$axios)
  const projectApiRepository = ProjectApiRepository(ctx.$axios)

  inject('authentication', authentication)
  inject('fileApiRepository', fileApiRepository)
  inject('projectApiRepository', projectApiRepository)
}
