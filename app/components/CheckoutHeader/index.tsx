import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutHeader = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CHECKOUT_HEADER, props)

export default CheckoutHeader
