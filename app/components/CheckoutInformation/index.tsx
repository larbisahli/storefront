import { selectConfig } from '@dropgala/store'
import { CheckoutFormValues } from '@dropgala/types'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'
import { Control, UseFormRegister } from 'react-hook-form/dist/types'

interface Props {
  errors: any
  control: Control<CheckoutFormValues, any>
  register: UseFormRegister<CheckoutFormValues>
}

const CheckoutInformation = ({ errors, control, register }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.CHECKOUT_INFORMATION, {
    errors,
    control,
    register
  })
}

export default CheckoutInformation
