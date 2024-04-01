import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutCartItems = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_CART_ITEMS, { ...props })

export default CheckoutCartItems
