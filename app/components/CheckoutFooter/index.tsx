import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CheckoutFooter = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CHECKOUT_FOOTER, props)

export default CheckoutFooter
