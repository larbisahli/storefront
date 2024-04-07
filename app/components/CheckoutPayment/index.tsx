import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutPayment = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_PAYMENT, { ...props })

export default CheckoutPayment
