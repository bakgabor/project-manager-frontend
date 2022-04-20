import Formatter from '~/plugins/text/formatter'
import SimpleFunctions from '~/plugins/simple_functions'
export default (ctx, inject) => {
  const formatter = Formatter(ctx)
  const simpleFunctions = SimpleFunctions(ctx)

  inject('formatter', formatter)
  inject('simpleFunctions', simpleFunctions)
}
