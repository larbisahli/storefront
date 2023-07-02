import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

const CheckoutItems = () => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.CHECKOUT_ITEMS, {})
}

export default CheckoutItems
