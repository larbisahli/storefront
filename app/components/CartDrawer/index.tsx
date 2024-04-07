import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CartDrawer = (props: any) =>
  componentFactory('CartDrawer', ModuleNames.CART_DRAWER, { ...props })

export default CartDrawer
