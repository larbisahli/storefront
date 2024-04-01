import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const CheckoutHeader = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_HEADER, { ...props })

export default CheckoutHeader
