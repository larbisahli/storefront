import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

const CheckoutCartItems = () => {
  const storeConfig = useAppSelector(selectConfig)

  return renderRemoteComponent(
    storeConfig.theme,
    ComponentNames.CHECKOUT_CART_ITEMS,
    {}
  )
}

export default CheckoutCartItems
