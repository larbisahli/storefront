import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutHeader = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_HEADER, { ...props })

export default CheckoutHeader
