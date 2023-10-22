import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const OrderSummary = () => {
  const storeConfig = useAppSelector(selectConfig)
  return componentFactory(storeConfig.theme, ComponentNames.ORDER_SUMMARY, {})
}

export default OrderSummary
