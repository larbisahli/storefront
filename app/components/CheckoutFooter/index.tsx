import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutFooter = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_FOOTER, { ...props })

export default CheckoutFooter
