import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutPayment = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_PAYMENT, { ...props })

export default CheckoutPayment
