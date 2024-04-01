import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutShipping = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_SHIPPING, { ...props })

export default CheckoutShipping
