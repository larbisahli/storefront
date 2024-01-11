import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'
import { Shipping } from '@dropgala/types/generated/shipping/Shipping'

const CheckoutShipping = ({ shippings }: { shippings: Shipping[] }) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CHECKOUT_SHIPPING, {
    shippings
  })
}

export default CheckoutShipping
