import { selectConfig } from '@dropgala/store'
import { CheckoutFormValues } from '@dropgala/types'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'
import { UseFormRegister } from 'react-hook-form/dist/types'

interface Props {
  register: UseFormRegister<CheckoutFormValues>
}

const CheckoutShipping = ({ register }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.CHECKOUT_SHIPPING, {
    register
  })
}

export default CheckoutShipping
