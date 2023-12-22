import { CheckoutFormValues } from '@dropgala/types'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { PaymentElement } from '@stripe/react-stripe-js'

interface Props {
  register: UseFormRegister<CheckoutFormValues>
  watch: UseFormWatch<CheckoutFormValues>
}

const paymentMethods = [
  // {
  //   name: 'Credit/ Debit Card',
  //   component: (selectedPaymentMethod: CheckoutFormValues['paymentMethod'])=>
  //   <StripePaymentOption selectedPaymentMethod={selectedPaymentMethod} id='STRIPE'/>,
  //   id: 'STRIPE'
  // },
  {
    name: 'Cash On Delivery',
    component: (selectedPaymentMethod: CheckoutFormValues['paymentMethod']) => (
      <CODPaymentOption
        selectedPaymentMethod={selectedPaymentMethod}
        id="COD"
      />
    ),
    id: 'COD'
  }
  // {
  //   name: 'PayPal',
  //   component: (selectedPaymentMethod:CheckoutFormValues['paymentMethod'])=>
  //   <PayPalPaymentOption selectedPaymentMethod={selectedPaymentMethod} id='PAYPAL'/>,
  //   id: 'PAYPAL'
  // }
]

const CheckoutPayment = ({ register, watch }: Props) => {
  const selectedPaymentMethod = watch('paymentMethod')
  return (
    <div className="mb-10 min-h-[400px] pt-5">
      <h1 className="mb-8 text-xl text-gray-900 font-semibold">
        Payment methods
      </h1>
      <Scrollbar className="cart-scrollbar flex-grow">
        {paymentMethods.map(({ name, id, component }) => (
          <Radio
            {...register('paymentMethod.id')}
            label={() => component(selectedPaymentMethod)}
            inputClassName="absolute right-0 top-0 m-2 z-10"
            id={id}
            key={id}
            value={id}
          />
        ))}
      </Scrollbar>
    </div>
  )
}

interface PayProps {
  selectedPaymentMethod: CheckoutFormValues['paymentMethod']
  id: string
}

const StripePaymentOption = ({ selectedPaymentMethod, id }: PayProps) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300">
      <div className="px-3 py-4">
        <div className="text-sm ml-8 text-gray text-gray-900">
          <span>Credit/ Debit Card</span>
        </div>
        {selectedPaymentMethod?.id === id && (
          <div className="bg-gray-100 h-[200px]">
            <PaymentElement />
          </div>
        )}
      </div>
    </div>
  )
}

const CODPaymentOption = ({ selectedPaymentMethod, id }: PayProps) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300">
      <div className="px-8 py-4">
        <div className="text-base font-medium text-gray text-gray-900">
          <span>Cash On Delivery</span>
        </div>
        {selectedPaymentMethod?.id === id && <div className=""></div>}
      </div>
    </div>
  )
}

const PayPalPaymentOption = ({ selectedPaymentMethod, id }: PayProps) => {
  return (
    <div className="bg-gray-100 w-full border-b-0 last:border-b relative shadow border border-gray-300">
      <div className="px-3 py-4">
        <div className="text-sm ml-8 text-gray text-gray-900">
          <span>PayPal</span>
        </div>
        {selectedPaymentMethod?.id === id && <div>HELLO</div>}
      </div>
    </div>
  )
}

export default CheckoutPayment
