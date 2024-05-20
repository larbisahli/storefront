import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutHeader = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_HEADER, props)

export default CheckoutHeader
