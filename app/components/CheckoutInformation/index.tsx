import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutInformation = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_INFORMATION, { ...props })

export default CheckoutInformation
