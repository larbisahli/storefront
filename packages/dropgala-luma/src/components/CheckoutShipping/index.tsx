import { useRouter } from 'next/router'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import { StoreProps, selectCheckout, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useState } from 'react'
import ChevronLeft from '@dropgala/assets/icons/chevron-left'
import Link from '../ui/Link'
import Button from '../ui/Button'
import ChevronRight from '@dropgala/assets/icons/chevron-right'
import Loader from '../ui/loader'
import ShippingOption from './shippingOption'
import { CheckoutSteps } from '@dropgala/types'
import { useMutation } from '@apollo/client'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

interface Props extends StoreProps {}

const CheckoutShipping = ({ useAppSelector }: Props) => {
  const router = useRouter()

  const { language } = useAppSelector(selectConfig)
  const checkout = useAppSelector(selectCheckout)
  const shippingAddress = checkout.shippingAddress

  const { __ } = useTranslation(language, 'common')

  const [selectedOption, setSelectedOption] = useState('')

  const [error, setError] = useState()

  // const [CreateOrder, { loading }] = useMutation(CREATE_ORDER, {
  //   context: {
  //     headers: {
  //       'x-csrf-token': 'csrfToken'
  //     }
  //   },
  //   onCompleted: (data: { forgetPassword: { success: boolean } }) => {
  //     if (data?.forgetPassword?.success) {
  //       // reset()
  //     }
  //   }
  // })

  const onSubmit = async () => {
    if (isEmpty(selectedOption)) {
      return
    }

    console.log('onSubmit values :>> ', { selectedOption })

    router.push(`/checkout/${CheckoutSteps.PAYMENT}`)

    // CreateOrder({ variables }).catch((err) => {
    //   setError(err)
    // })
  }

  const isLoading = false

  const handleOptionChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(changeEvent.target.value)
  }

  const renderShippingAddress = () => {
    if (isEmpty(shippingAddress)) return

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-light uppercase">{__('Shipping to')}</h1>
          <Link
            href={{
              pathname: `/checkout/${CheckoutSteps.INFORMATION}`
            }}
          >
            <div className="underline text-md flex-0 text-gray-700">
              {__('Change')}
            </div>
          </Link>
        </div>
        <div className="border border-gray-800 rounded-sm">
          <div className="flex-1">
            <div className="flex items-center p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('Full name')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.fullName}
                </span>
              </div>
            </div>
            <div className="flex items-center bg-gray-200 p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('Phone Number')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.phone}
                </span>
              </div>
            </div>
            <div className="flex items-center p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('Address')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.address}
                </span>
              </div>
            </div>
            <div className="flex items-center bg-gray-200 p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('Country')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.country?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('City')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.city}
                </span>
              </div>
            </div>
            <div className="flex items-center bg-gray-200 p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('State/Province/Region')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.state}
                </span>
              </div>
            </div>
            <div className="flex items-center p-2 py-1">
              <span className="capitalized font-semibold flex-0">
                {__('Zip/Postal Code')}
              </span>
              <div className="flex-1 w-full flex justify-end">
                <span className="w-[250px] text-sm">
                  {shippingAddress?.zip}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isEmpty(checkout?.cartId)) {
    return null
  }

  return (
    <div className="mb-10 pt-4 relative flex flex-col h-full w-full">
      {/* INFORMATION SUMMERY */}
      {renderShippingAddress()}
      {/* LOADER */}
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0 z-10">
          <Loader />
        </div>
      )}
      <div className="flex-1">
        <h1 className="my-8 text-xl mb-4 mt-8 font-light uppercase">
          {__('Delivery options')}
        </h1>
        <Scrollbar className="cart-scrollbar flex-grow w-full">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Radio
              name={idx.toString()}
              value={idx.toString()}
              checked={selectedOption === idx.toString()}
              onChange={handleOptionChange}
              label={() => <ShippingOption useAppSelector={useAppSelector} />}
              inputClassName="absolute right-0 top-0 m-2 z-10"
              id={idx.toString()}
              key={idx}
            />
          ))}
        </Scrollbar>
      </div>
      <div className="my-5 flex items-center justify-between flex-0">
        <Link
          href={{
            pathname: `/checkout/${CheckoutSteps.INFORMATION}`
          }}
        >
          <div className="text-gray-700 hover:text-gray-900 flex items-center">
            <div className="mr-2">
              <ChevronLeft width={12} height={12} />
            </div>
            <div>{__('Return to Information')}</div>
          </div>
        </Link>
        <Button
          type="submit"
          className="bg-black text-white font-semibold place-content-end capitalize text-lg w-[280px]"
          disabledClass="pointer-events-none"
          loading={isLoading}
          disabled={isLoading}
          onClick={onSubmit}
        >
          <div>{__('Continue to Payment')}</div>
          <div className="ml-2">
            <ChevronRight width={12} height={12} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default CheckoutShipping
