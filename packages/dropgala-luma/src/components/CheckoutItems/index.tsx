import ArrowDownIcon from '@dropgala/assets/icons/arrow-down'
import ArrowUpIcon from '@dropgala/assets/icons/arrow-up'
import CardIcon from '@dropgala/assets/icons/card'
import CloseIcon from '@dropgala/assets/icons/close'
import CouponIcon from '@dropgala/assets/icons/coupon-icon'
import Scrollbar from '../common/Scrollbar'
import Button from '../ui/Button'
import Input from '../ui/Input1'
// import { ProductItemLoader } from '@components/ui/loaders/product-details-loaders';
import { useMedia } from '../../hooks/useMedia'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import CheckoutItem from './CheckoutItem'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { StoreProps, selectCart, selectConfig } from '@dropgala/store'
import {
  UseCartItemsTotalPrice,
  UseCartItemsTotalPriceExclTax
} from '../../hooks/useCartItemsTotalPrice'
import { useCartItemsCount } from '../../hooks/useCartItemsCount'
import EditIcon from '@dropgala/assets/icons/edit'
import Link from '../ui/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props extends StoreProps {}

const CheckoutItems = ({ useAppSelector }: Props) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const [open, setOpen] = useState(false)

  const { defaultCurrency, tax, language } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  const cart = useAppSelector(selectCart)

  const { items = [] } = cart

  // In case the cart is empty
  useEffect(() => {
    if (isEmpty(items)) {
      router.push('/')
    }
  }, [router, items])

  const itemsCount = useCartItemsCount(items)

  const itemsTotalPrice = UseCartItemsTotalPrice(cart)
  const totalPriceExclTax = UseCartItemsTotalPriceExclTax(cart)

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
      <div className="mt-3 flex items-center justify-between">
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
          {__('Tax total (%s)', `${tax?.rate}%`)}
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
        {/* Cart Items */}
        <Scrollbar className="cart-scrollbar overflow-x-hidden !max-h-[300px] flex-grow pr-2">
          {items?.map((item) => (
            <CheckoutItem
              item={item}
              key={item.key || item.id}
              useAppSelector={useAppSelector}
            />
          ))}
        </Scrollbar>
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="split-line-thin my-20px"
        ></div>
        {/* Input */}
        <div className="flex items-center">
          <Input
            className="w-full mr-3"
            inputClassName="placeholder-gray-500 border border-solid border-gray-400"
            placeholder="Discount code"
          />
          <Button className="bg-black text-white h-10 px-5 capitalize">
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
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="split-line-thin my-20px"
        ></div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 text-sm">{__('Shipping')}</span>
            <span className="text-12px text-gray-800">
              {__('Calculated at next step')}
            </span>
          </div>
          <div className="h-[1px] w-full bg-gray-400 my-10px"></div>
          {renderSubTotal()}
          {renderDiscount()}
          {renderTaxTotal()}
        </div>
        <div className="h-[1px] w-full bg-gray-400 my-20px"></div>
        {renderTotal()}
      </div>
    </div>
  )
}

export default CheckoutItems
