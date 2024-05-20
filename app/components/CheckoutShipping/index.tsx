import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutShipping = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_SHIPPING, props)

export default CheckoutShipping
