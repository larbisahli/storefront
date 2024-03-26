import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'
import { Shipping } from '@dropgala/types/generated/shipping/Shipping'

const CheckoutShipping = ({ shippings }: { shippings: Shipping[] }) => {
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']
  return componentFactory(ComponentNames.CHECKOUT_SHIPPING, {
    shippings,
    data
  })
}

export default CheckoutShipping
