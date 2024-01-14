import { useRouter } from 'next/router'
import Button from '../ui/Button'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { CheckoutSteps } from '@dropgala/types'
import { FC } from 'react'
import { StoreProps, selectCart, selectConfig } from '@dropgala/store'
import Image from '../common/Image'
import Link from '../ui/Link'
import dynamic from 'next/dynamic'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useCartTotal } from '@dropgala/utils/hooks/useCartTotal'

const LockIcon = dynamic(() => import('@dropgala/assets/icons/lock'), {
  loading: () => <></>,
  ssr: false
})

const payment = [
  {
    id: 1,
    path: '/',
    image: '/assets/images/payment/mastercard.svg',
    name: 'payment-master-card',
    width: 34,
    height: 20
  },
  {
    id: 2,
    path: '/',
    image: '/assets/images/payment/visa.svg',
    name: 'payment-visa',
    width: 50,
    height: 20
  },
  {
    id: 3,
    path: '/',
    image: '/assets/images/payment/stripe.svg',
    name: 'payment-stripe',
    width: 60,
    height: 40
  },
  {
    id: 4,
    path: '/',
    image: '/assets/images/payment/jcb.svg',
    name: 'payment-jcb',
    width: 26,
    height: 20
  }
]

interface Props extends StoreProps {}

const OrderSummary: FC<Props> = ({ useAppSelector }) => {
  const router = useRouter()
  const cart = useAppSelector!(selectCart)
  const { defaultCurrency, language, tax } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  const { locale = 'en-US' } = router

  const cartTotal = useCartTotal({ cart, taxRate: tax?.rate })

  const itemsTotalPrice = cartTotal?.totalPrice?.value
  const totalPriceExclTax = cartTotal?.totalExclTax?.value

  const totalPrice = usePrice({
    amount: itemsTotalPrice,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const totalExclTax = usePrice({
    amount: totalPriceExclTax,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const totalTax = usePrice({
    amount: itemsTotalPrice - totalPriceExclTax,
    locale,
    currencyCode: defaultCurrency?.code
  })

  return (
    <div className="w-full h-full mt-5 relative last:border-b-0 px-4">
      <div className="sticky top-0">
        <div className="bg-white p-2 px-5 pt-5 rounded border border-gray-300">
          <h4 className="text-lg text-black font-semibold">
            {__('Order Summary')}
          </h4>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-gray-800 text-sm">
              {__('Tax total (%s)', `${tax?.rate}%`)}:
            </span>
            <span className="text-sm text-gray-800">{totalTax}</span>
          </div>
          <div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-gray-900 font-bold text-lg">
                {__('Subtotal')} &nbsp;
                <span className="font-normal text-gray-700 text-13px">
                  {__('(Incl. VAT)')}
                </span>
              </span>
              <span className="font-semibold text-xl text-gray-900">
                {totalPrice}
              </span>
            </div>
            <div className="text-right w-full text-gray-800 text-xs font-medium">
              {__('Excl. tax: %s', totalExclTax)}
            </div>
          </div>
          <div>
            <Link
              href={{
                pathname: '/checkout'
              }}
            >
              <div className="w-full mt-20px flex justify-center">
                <Button className="!w-full flex items-center text-white bg-black !font-bold text-xl !rounded-[2px]">
                  <div className="text-white mx-2">
                    <LockIcon width={18} height={18} />
                  </div>
                  <div className="lowercase leading-none first-letter:uppercase">
                    {__('Checkout securely now')}
                  </div>
                </Button>
              </div>
            </Link>
          </div>
          <p className="pt-4 pb-2 text-gray-600 text-xs">
            {__('Apply a Coupon on the next step.')}
          </p>
        </div>
        <div className="mt-8">
          <span className="text-black text-lg font-semibold">
            {__('We Accept')}
          </span>
          {payment && (
            <ul className="flex flex-wrap space-s-4 sm:space-s-5 lg:space-s-7 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex mr-3"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      isCustomUrl
                      src={item.image}
                      alt={''}
                      height={item.height}
                      width={item.width}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
