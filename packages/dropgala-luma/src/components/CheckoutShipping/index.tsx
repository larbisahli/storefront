import { CheckoutFormValues } from '@dropgala/types'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import { UseFormRegister } from 'react-hook-form'

interface Props {
  register: UseFormRegister<CheckoutFormValues>
}

const CheckoutShipping = ({ register }: Props) => {
  return (
    <div className="mb-10">
      <h1 className="my-8 text-xl text-gray-900 font-medium">
        Delivery method
      </h1>
      <Scrollbar className="cart-scrollbar flex-grow">
        {Array.from({ length: 3 }).map((_, idx) => (
          <ShippingOption key={idx} register={register} />
        ))}
      </Scrollbar>
    </div>
  )
}

const ShippingOption = ({ register }: Props) => {
  return (
    <div className="bg-gray-100 w-full sm:rounded mt-3 relative shadow border border-gray-300 cursor-pointer">
      <div className="px-3 py-4">
        <div className="font-semibold text-base text-skin-base">
          <span>Shipping:</span>
          <span className="mx-1">{'$34.58'}</span>
        </div>
        <div className="text-sm">
          Ships to {'Morocco'} via {'Amana Express'}
        </div>
        <div className="text-sm">Estimated days: {'1-3 days'}</div>
        <div className="text-sm bg-gray-200 border border-gray-300 px-2 py-1 max-w-fit mt-2 rounded shadow-badge">
          Tracking Available
        </div>
        <div className="absolute right-0 top-0 m-2">
          <Radio
            {...register('status')}
            label={''}
            id="published"
            value="publish"
          />
        </div>
      </div>
    </div>
  )
}

export default CheckoutShipping
