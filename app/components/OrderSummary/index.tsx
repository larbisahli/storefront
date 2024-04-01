import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const OrderSummary = (props: any) =>
  componentFactory(ComponentNames.ORDER_SUMMARY, { ...props })

export default OrderSummary
