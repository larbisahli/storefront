import { ModuleGroup, StoreLayoutComponentContentType } from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const PromoBanner = (props: Props) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  if (isEmpty(data?.items)) return null
  return componentFactory(props?.moduleName, ModuleGroup.PROMO_BANNER, props)
}

export default PromoBanner
