import { ModuleNames } from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const PromoBanner = ({ componentName, ...props }: Props) => {
  const data = resolvePath(props, 'fields.data', {})
  if (isEmpty(data?.items)) return null
  return componentFactory(componentName, ModuleNames.PROMO_BANNER, { ...props })
}

export default PromoBanner
