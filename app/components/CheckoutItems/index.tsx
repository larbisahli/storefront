import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutItems = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_ITEMS, props)

export default CheckoutItems
