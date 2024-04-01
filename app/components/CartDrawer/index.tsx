import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CartDrawer = (props: any) =>
  componentFactory(ComponentNames.CART_DRAWER, { ...props })

export default CartDrawer
