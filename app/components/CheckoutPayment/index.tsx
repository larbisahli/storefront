import { selectConfig } from '@dropgala/store'
import { CheckoutFormValues } from '@dropgala/types'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'
import { UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types'

interface Props {
  register: UseFormRegister<CheckoutFormValues>
  watch: UseFormWatch<CheckoutFormValues>
}

const CheckoutPayment = ({ register, watch }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CHECKOUT_PAYMENT, {
    register,
    watch
  })
}

export default CheckoutPayment
