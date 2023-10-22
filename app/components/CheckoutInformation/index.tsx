import { selectConfig } from '@dropgala/store'
import { CheckoutFormValues } from '@dropgala/types'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'
import { Control, UseFormRegister } from 'react-hook-form/dist/types'

interface Props {
  errors: any
  control: Control<CheckoutFormValues, any>
  register: UseFormRegister<CheckoutFormValues>
}

const CheckoutInformation = ({ errors, control, register }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CHECKOUT_INFORMATION, {
    errors,
    control,
    register
  })
}

export default CheckoutInformation
