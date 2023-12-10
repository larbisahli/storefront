import { useRouter } from 'next/router'
import Button from '../ui/Button'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { CheckoutSteps } from '@dropgala/types'
import { UseCartItemsTotalPrice } from '../../hooks/useCartItemsTotalPrice'
import { FC } from 'react'
import { StoreProps, selectCart, selectConfig } from '@dropgala/store'
import Image from '../common/Image'
import Link from '../ui/Link'

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
  const cart = useAppSelector!(selectCart)
  const { defaultCurrency } = useAppSelector(selectConfig)
  const router = useRouter()
  const { locale = 'en-US' } = router
  const calculatePrice = UseCartItemsTotalPrice(cart)
  const totalPrice = usePrice({
    amount: calculatePrice,
    locale,
    currencyCode: defaultCurrency?.code
  })
  return (
    <div className="w-full h-full mt-5 relative last:border-b-0 px-4">
      <div className="sticky top-0">
        <div className="bg-white p-2 px-5 pt-5 rounded border border-gray-300">
          <h4 className="text-lg text-black font-semibold">Order Summary</h4>
          <div className="flex items-center justify-between mt-3">
            <div className="text-gray-800">Subtotal</div>
            <div className="text-black font-bold text-2xl">{totalPrice}</div>
          </div>
          <div>
            <Link
              href={{
                pathname: '/checkout',
                query: {
                  step: CheckoutSteps.CONTACT_INFORMATION
                }
              }}
            >
              <div className="w-full mt-20px flex justify-center">
                <Button className="!w-full text-white bg-black !font-bold text-xl !rounded-[2px]">
                  <div className="lowercase first-letter:capitalize">
                    Checkout securely now
                  </div>
                </Button>
              </div>
            </Link>
          </div>
          <p className="pt-4 pb-2 text-gray-600 text-xs">
            Apply a Coupon on the next step.
          </p>
        </div>
        <div className="mt-8">
          <span className="text-black text-lg font-semibold">We Accept</span>
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
