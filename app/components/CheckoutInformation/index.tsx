import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutInformation = (props: any) =>
  componentFactory(ComponentNames.CHECKOUT_INFORMATION, { ...props })

export default CheckoutInformation
