import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const OrderSummary = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.ORDER_SUMMARY, props)

export default OrderSummary
