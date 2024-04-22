import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutFooter = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CHECKOUT_FOOTER, props)

export default CheckoutFooter
