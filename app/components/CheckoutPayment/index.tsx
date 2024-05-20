import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutPayment = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_PAYMENT, props)

export default CheckoutPayment
