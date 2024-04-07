import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutShipping = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_SHIPPING, { ...props })

export default CheckoutShipping
