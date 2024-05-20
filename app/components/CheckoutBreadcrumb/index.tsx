import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutBreadcrumb = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_BREADCRUMB, props)

export default CheckoutBreadcrumb
