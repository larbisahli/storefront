import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutBreadcrumb = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_BREADCRUMB, { ...props })

export default CheckoutBreadcrumb
