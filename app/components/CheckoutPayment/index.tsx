import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutPayment = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CHECKOUT_PAYMENT, props)

export default CheckoutPayment
