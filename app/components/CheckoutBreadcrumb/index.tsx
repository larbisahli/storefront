import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutBreadcrumb = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CHECKOUT_BREADCRUMB, props)

export default CheckoutBreadcrumb
