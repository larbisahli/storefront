import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutInformation = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_INFORMATION, props)

export default CheckoutInformation
