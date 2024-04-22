import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutItems = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CHECKOUT_ITEMS, props)

export default CheckoutItems
