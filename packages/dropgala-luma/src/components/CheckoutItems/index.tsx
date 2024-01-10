import ArrowDownIcon from '@dropgala/assets/icons/arrow-down'
import ArrowUpIcon from '@dropgala/assets/icons/arrow-up'
import CardIcon from '@dropgala/assets/icons/card'
import CloseIcon from '@dropgala/assets/icons/close'
import CouponIcon from '@dropgala/assets/icons/coupon-icon'
import Scrollbar from '../common/Scrollbar'
import Button from '../ui/Button'
import Input from '../ui/Input1'
import { useMutation, gql } from '@apollo/client'
// import { ProductItemLoader } from '@components/ui/loaders/product-details-loaders';
import { useMedia } from '../../hooks/useMedia'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCartTotal } from '@dropgala/utils/hooks/useCartTotal'
import CheckoutItem from './CheckoutItem'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { StoreProps, selectCart, selectConfig } from '@dropgala/store'
import EditIcon from '@dropgala/assets/icons/edit'
import Link from '../ui/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

export const CREATE_CATEGORY = gql`
  mutation ApplyCoupon($code: String!, $cartId: String!, $storeId: String!) {
    applyCoupon(code: $code, cartId: $cartId, storeId: $storeId) {
      id
      code
    }
  }
`

interface Props extends StoreProps {}

const CheckoutItems = ({ useAppSelector }: Props) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const [open, setOpen] = useState(false)
  const [couponCode, setCouponCode] = useState(null)

  const { defaultCurrency, tax, language, csrf } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  const cart = useAppSelector(selectCart)

  const [applyCoupon, { loading }] = useMutation(CREATE_CATEGORY, {
    context: {
      headers: {
        'x-csrf-token': csrf?.csrfToken
      }
    },
    onCompleted: (data: any) => {
      console.log('=========>', { data })
    }
  })
  const handleCoupon = () => {
    console.log({ couponCode })
    applyCoupon({
      variables: {
        code: couponCode,
        cartId: 'CARD_ID',
        storeId: '1234'
      }
    }).catch((err) => {
      console.log({ err })
      // setError(err);
    })
  }

  // In case the cart is empty
  useEffect(() => {
    if (isEmpty(cart?.items)) {
      router.push('/')
    }
  }, [router, cart])

  const cartTotal = useCartTotal({ cart, taxRate: tax?.rate })

  const itemsCount = cart?.totalQuantity
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

  const isMobile = useMedia('(max-width: 1023px)', false)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  const renderSubTotal = () => {
    return (
      <div className="mt-3 flex items-center justify-between mb-3">
        <span className="text-gray-900 text-sm">
          {__('Subtotal')} &nbsp;
          <span className="font-normal text-gray-700 text-13px">
            {__('(Incl. VAT)')}
          </span>
        </span>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-base text-gray-900">
            {totalPrice}
          </span>
          <div className="text-right w-full text-gray-900 text-xs font-medium">
            {__('Excl. tax: %s', totalExclTax)}
          </div>
        </div>
      </div>
    )
  }

  const renderTaxTotal = () => {
    return (
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-900 text-sm">
          {__('Tax (%s)', `${tax?.rate}%`)}
        </span>
        <span className="text-sm font-semibold text-base text-gray-900">
          {totalTax}
        </span>
      </div>
    )
  }

  const renderDiscount = () => {
    return (
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-900 text-sm">
          {__('Discount (%s)', '-5%')}
        </span>
        <span className="text-sm font-semibold text-base text-gray-900">
          {'-$12.89'}
        </span>
      </div>
    )
  }

  const renderTotal = () => {
    return (
      <div className="flex items-center justify-between">
        <span className="text-black font-bold text-base">
          {__('Order total')}
        </span>
        <div className="flex items-end flex-col">
          <span className="text-black font-bold text-lg">{totalPrice}</span>
          <div className="text-right w-full text-gray-800 text-xs font-medium">
            {__('Excl. tax: %s', totalExclTax)}
          </div>
        </div>
      </div>
    )
  }

  const renderShipment = () => {
    const shippingPrice = 0
    return (
      <div className="flex items-center justify-between">
        <span className="text-gray-900 text-sm">
          {__('Shipping (%s)', 'DHL')}
        </span>
        <div className="flex items-end flex-col">
          {shippingPrice ? (
            <>
              <span className="text-black font-bold text-lg">
                {shippingPrice}
              </span>
              <div className="text-right w-full text-gray-800 text-xs font-medium">
                {__('Excl. tax: %s', shippingPrice)}
              </div>
            </>
          ) : (
            <span className="font-thin text-black text-sm">
              {__('Calculated at next step')}
            </span>
          )}
        </div>
      </div>
    )
  }

  const renderCoupon = () => {
    return (
      <div>
        <div className="font-medium">{__('Have a discount code?')}</div>
        <div className="flex items-center">
          <Input
            className="w-full mr-3"
            inputClassName="placeholder-gray-500 border border-solid border-gray-400"
            placeholder="Discount code"
            value={couponCode}
            onChange={(e: { target: { value: React.SetStateAction<null> } }) =>
              setCouponCode(e.target.value)
            }
          />
          <Button
            onClick={handleCoupon}
            loading={loading}
            className="bg-black text-white h-10 px-5 capitalize"
          >
            {__('Apply')}
          </Button>
        </div>
        {/* COUPON */}
        <div
          style={{ color: '#6d6c6c' }}
          className="flex items-center bg-gray-400 w-fit px-2 py-1 my-3 shadow-card"
        >
          <div>
            <CouponIcon width={14} height={14} />
          </div>
          <div className="p-1 lg:max-w-[200px] overflow-hidden text-skin-base">
            {'VT_XYRXSQIZQ'}
          </div>
          <button className="m-1">
            <CloseIcon width={10} height={10} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="2xxl:max-w-[550px] mx-auto">
      <div
        className={cn('w-full text-ted-500', {
          hidden: !isMobile
        })}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between p-3 w-full"
        >
          <div className="flex items-center">
            <CardIcon width={14} height={14} />
            <div className="p-1">{__('Show order summary')}</div>
            {open ? (
              <ArrowUpIcon width={14} height={14} />
            ) : (
              <ArrowDownIcon width={14} height={14} />
            )}
          </div>
          <span className="text-skin-base text-base font-medium">
            {totalPrice}
          </span>
        </button>
      </div>

      <div
        className={cn(
          'py-4 px-2 lg:rounded-r-md rounded-none border border-b-gray-400 lg:border-b-transparent border-l-transparent',
          { hidden: !open }
        )}
      >
        <div className="flex items-center justify-between mb-20px border-b  pb-1 border-b-gray-400">
          <h4 className="text-lg text-black font-semibold">
            {`Order Summary (${itemsCount})`}
          </h4>
          <div className="flex justify-center items-center">
            <div className="text-gray-700">
              <EditIcon />
            </div>
            <Link href="/cart">
              {' '}
              <span className="underline text-sm px-1 font-medium">
                {__('Edit shopping cart')}
              </span>
            </Link>
          </div>
        </div>
        <div className="relative">
          {/* Cart Items */}
          {cart?.items?.map((item) => (
            <CheckoutItem
              item={item}
              key={item.key || item.id}
              useAppSelector={useAppSelector}
            />
          ))}
        </div>
        <div className="h-[1px] w-full bg-gray-400 my-5"></div>
        {renderCoupon()}
        <div className="h-[1px] w-full bg-gray-400 my-5"></div>
        <div>
          {renderSubTotal()}
          {renderShipment()}
          {renderDiscount()}
          {renderTaxTotal()}
        </div>
        <div className="h-[1px] w-full bg-gray-400 my-5"></div>
        {renderTotal()}
      </div>
    </div>
  )
}

export default CheckoutItems
