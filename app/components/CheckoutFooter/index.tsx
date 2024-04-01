import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutFooter = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_FOOTER, { ...props })

export default CheckoutFooter
