import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const CheckoutHeader = () => {
  const storeConfig = useAppSelector(selectConfig)
  return componentFactory(storeConfig.theme, ComponentNames.CHECKOUT_HEADER, {})
}

export default CheckoutHeader
