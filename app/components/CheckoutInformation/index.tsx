import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const CheckoutInformation = () => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CHECKOUT_INFORMATION, {})
}

export default CheckoutInformation
