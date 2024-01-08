import { useRouter } from 'next/router'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import { StoreProps, selectConfig } from '@dropgala/store'
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

  return (
    <div className="mb-10 pt-4 relative flex flex-col h-full">
      {/* INFORMATION SUMMERY */}
      <div className="flex items-center">
        <div className="text-gray-800">{__('Ship to')}:</div>
        <div className="mx-1 flex-1">address, city state zip, country</div>
        <button className="underline text-md flex-0 text-gray-700">
          {__('Change')}
        </button>
      </div>
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
