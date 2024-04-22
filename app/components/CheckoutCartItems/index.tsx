import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutCartItems = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CHECKOUT_CART_ITEMS, props)

export default CheckoutCartItems
