import { CheckoutFormValues } from '@dropgala/types'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import { UseFormRegister } from 'react-hook-form'

interface Props {
  register: UseFormRegister<CheckoutFormValues>
}

const CheckoutPayment = ({ register }: Props) => {
  return (
    <div className="mb-10 min-h-[400px] pt-5">
      <h1 className="mb-8 text-xl text-gray-900 font-medium">
        Payment methods
      </h1>
      <Scrollbar className="cart-scrollbar flex-grow">
        {Array.from({ length: 3 }).map((_, idx) => (
          <PaymentOption key={idx} register={register} />
        ))}
      </Scrollbar>
    </div>
  )
}

const PaymentOption = ({ register }: Props) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300 cursor-pointer">
      <div className="px-3 py-4">
        <Radio
          {...register('status')}
          label={''}
          id="published"
          value="publish"
        />
        <div className="text-sm ml-8 text-gray text-gray-900">
          <span>Credit/ Debit Card</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPayment
