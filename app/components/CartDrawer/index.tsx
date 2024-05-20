import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CartDrawer = (props: Props) =>
  componentFactory('CartDrawer', ModuleGroup.CART_DRAWER, { ...props })

export default CartDrawer
