import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const CheckoutFooter = () => {
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-footer']
  return componentFactory(ComponentNames.CHECKOUT_FOOTER, { data })
}

export default CheckoutFooter
