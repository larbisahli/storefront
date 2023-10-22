import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const CheckoutCartItems = () => {
  const storeConfig = useAppSelector(selectConfig)
  return componentFactory(
    storeConfig.theme,
    ComponentNames.CHECKOUT_CART_ITEMS,
    {}
  )
}

export default CheckoutCartItems
