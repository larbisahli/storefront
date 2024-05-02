import { ModuleNames } from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const PromoBanner = (props: Props) => {
  const data = resolvePath(props, 'data', {})
  if (isEmpty(data?.items)) return null
  return componentFactory(props?.componentName, ModuleNames.PROMO_BANNER, props)
}

export default PromoBanner
