import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

const CheckoutHeader = () => {
  const { theme } = useAppSelector(selectConfig)
  return renderRemoteComponent(theme, ComponentNames.CHECKOUT_HEADER, {})
}

export default CheckoutHeader
