import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const OrderSummary = (props: any) =>
  componentFactory(null, ModuleNames.ORDER_SUMMARY, { ...props })

export default OrderSummary
