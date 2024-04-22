import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const OrderSummary = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.ORDER_SUMMARY, props)

export default OrderSummary
