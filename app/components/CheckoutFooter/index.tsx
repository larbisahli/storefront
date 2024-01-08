import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const CheckoutFooter = () => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CHECKOUT_FOOTER, {})
}

export default CheckoutFooter
