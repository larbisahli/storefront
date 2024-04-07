import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutCartItems = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_CART_ITEMS, { ...props })

export default CheckoutCartItems
