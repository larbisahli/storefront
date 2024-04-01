import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutBreadcrumb = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_BREADCRUMB, { ...props })

export default CheckoutBreadcrumb
