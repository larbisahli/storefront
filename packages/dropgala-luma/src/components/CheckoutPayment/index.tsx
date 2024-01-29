import { CheckoutSteps } from '@dropgala/types'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import CODPaymentOption from './CODPaymentOption'
import Loader from '../ui/loader'
import ChevronLeft from '@dropgala/assets/icons/chevron-left'
import Button from '../ui/Button'
import ChevronRight from '@dropgala/assets/icons/chevron-right'
import Link from '../ui/Link'
import { StoreProps, selectConfig } from '@dropgala/store'
import { memo, useState } from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useRouter } from 'next/router'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ShippingAddress from './shippingAddress'
// import { PaymentElement } from '@stripe/react-stripe-js'
import { useMutation } from '@apollo/client'
import { CREATE_ORDER } from '@dropgala/query/checkout.query'

const paymentMethods = [
  // {
  //   name: 'Credit/ Debit Card',
  //   component: (selectedPaymentMethod: CheckoutFormValues['paymentMethod'])=>
  //   <StripePaymentOption selectedPaymentMethod={selectedPaymentMethod} id='STRIPE'/>,
  //   id: 'STRIPE'
  // },
  {
    name: 'Cash On Delivery',
    component: (selectedOption: string) => (
      <CODPaymentOption selectedOption={selectedOption} id="COD" />
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

interface Props extends StoreProps {}

const CheckoutPayment = ({ useAppSelector }: Props) => {
  const router = useRouter()

  const { language, csrf, storeId } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')

  const [selectedOption, setSelectedOption] = useState('')
  const [tncChecked, setTncChecked] = useState(false)

  const [error, setError] = useState()

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    context: {
      headers: {
        'x-csrf-token': csrf?.csrfToken
      }
    },
    onCompleted: (data: { createOrder: { ref: string; success: boolean } }) => {
      const order = data.createOrder
      console.log({ order })
      if (isEmpty(order)) {
        return
      }
      router.push({
        pathname: `/${CheckoutSteps.CONFIRMATION_SUMMARY}`,
        query: { ref: order?.ref, status: order?.success }
      })
    }
  })

  const onSubmit = async () => {
    if (isEmpty(selectedOption)) {
      return
    }

    createOrder({
      variables: {
        storeId,
        paymentId: selectedOption
      }
    }).catch((err) => {
      setError(err)
    })
  }

  const handleOptionChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(changeEvent.target.value)
  }

  const isLoading = false

  const handleTNC = (changeEvent: any) => {
    setTncChecked(changeEvent?.target.checked)
  }

  return (
    <div className="mb-10 pt-4 relative flex flex-col h-full">
      {/* INFORMATION SUMMERY */}
      <ShippingAddress useAppSelector={useAppSelector} />
      {/* LOADER */}
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0 z-10">
          <Loader />
        </div>
      )}
      <div className="flex-1">
        <h1 className="my-8 text-xl mb-4 mt-8 font-light uppercase">
          {__('Payment methods')}
        </h1>
        <Scrollbar className="cart-scrollbar flex-grow">
          {paymentMethods.map(({ id, component }) => (
            <Radio
              name={id}
              label={() => component(selectedOption)}
              inputClassName="absolute right-0 top-0 m-2 z-10"
              onChange={handleOptionChange}
              id={id}
              key={id}
              value={id}
            />
          ))}
        </Scrollbar>
      </div>
      <div>
        <div>
          <div className="flex items-center">
            <input
              id="terms"
              name={'terms'}
              type="checkbox"
              className={`checkbox`}
              checked={tncChecked}
              onClick={handleTNC}
            />
            <label
              htmlFor={'terms'}
              className="text-gray-900 text-base text-sm hover:text-blue-500"
            >
              {__('Agree to Terms & Conditions')}
              <Link
                href="/terms-and-conditions"
                target="_blank"
                className="mx-1 font-semibold text-blue-600"
              >
                - {__('read more')}
              </Link>
            </label>
          </div>
        </div>
        <div className="my-5 flex items-center justify-between flex-0">
          <Link
            href={{
              pathname: `/checkout/${CheckoutSteps.SHIPPING}`
            }}
          >
            <div className="text-gray-700 hover:text-gray-900 flex items-center">
              <div className="mr-2">
                <ChevronLeft width={12} height={12} />
              </div>
              <div>{__('Return to Shipping')}</div>
            </div>
          </Link>
          <Button
            type="submit"
            className="bg-black text-white font-semibold place-content-end capitalize text-lg w-[280px]"
            disabledClass="pointer-events-none !bg-gray-700 !text-gray-500"
            loading={loading}
            disabled={loading || !tncChecked}
            onClick={onSubmit}
          >
            <div>{__('Complete order')}</div>
            <div className="ml-2">
              <ChevronRight width={12} height={12} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutPayment)
