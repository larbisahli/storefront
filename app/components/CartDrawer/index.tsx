import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CartDrawer = (props: Props) =>
  componentFactory('CartDrawer', ModuleNames.CART_DRAWER, { ...props })

export default CartDrawer
