import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CheckoutItems = (props: any) =>
  componentFactory(null, ModuleNames.CHECKOUT_ITEMS, { ...props })

export default CheckoutItems
