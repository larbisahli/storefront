import ArrowDownIcon from '../../assets/icons/arrow-down'
import ArrowUpIcon from '../../assets/icons/arrow-up'
import CardIcon from '../../assets/icons/card'
import CloseIcon from '../../assets/icons/close'
import CouponIcon from '../../assets/icons/coupon-icon'
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
import { UseCartItemsTotalPrice } from '../../hooks/useCartItemsTotalPrice'
import { useCartItemsCount } from '../../hooks/useCartItemsCount'
import EditIcon from '../../assets/icons/edit'
import Link from '../ui/Link'

interface Props extends StoreProps {}

const CheckoutItems = ({ useAppSelector }: Props) => {
  const router = useRouter()
  const { locale } = router

  const [open, setOpen] = useState(false)

  const config = useAppSelector(selectConfig)

  const cart = useAppSelector(selectCart)

  const { items = [] } = cart

  // In case the cart is empty
  useEffect(() => {
    if (isEmpty(items)) {
      router.push('/')
    }
  }, [router, items])

  const itemsCount = useCartItemsCount(items)

  const calculatePrice = UseCartItemsTotalPrice(cart)

  const totalPrice = usePrice({
    amount: calculatePrice,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const isMobile = useMedia('(max-width: 1023px)', false)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  return (
    <div className="2xxl:max-w-[550px] mx-auto">
      <div
        className={cn('w-full text-ted-500', {
          hidden: !isMobile
        })}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between px-4 p-3 w-full"
        >
          <div className="flex items-center">
            <CardIcon width="1.3rem" height="1.3rem" />
            <div className="p-1">Show order summary</div>
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
          <span className="text-skin-base text-base font-medium">
            {totalPrice}
          </span>
        </button>
      </div>

      <div
        className={cn(
          'py-4 px-6 lg:rounded-r-md rounded-none border border-b-gray-400 lg:border-b-transparent border-l-transparent',
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
                Edit shopping cart
              </span>
            </Link>
          </div>
        </div>
        {/* Cart Items */}
        <Scrollbar className="cart-scrollbar !max-h-[300px] flex-grow pr-2">
          {isEmpty(items)
            ? Array.from({ length: 2 }).map((_, idx) => (
                // <ProductItemLoader key={idx} />
                <div>LOADING</div>
              ))
            : items?.map((item) => (
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
          <Button className="bg-gray-500 h-10 px-5 capitalize">Apply</Button>
        </div>
        {/* COUPON */}
        <div
          style={{ color: '#6d6c6c' }}
          className="flex items-center bg-gray-400 w-fit px-2 py-1 my-3 shadow-card"
        >
          <div>
            <CouponIcon width="1.2rem" height="1.2rem" />
          </div>
          <div className="p-1 lg:max-w-[110px] overflow-hidden text-skin-base">
            {'VT_XYRXSQIZQ'}
          </div>
          <button className="m-1">
            <CloseIcon width="10px" height="10px" />
          </button>
        </div>
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="split-line-thin my-20px"
        ></div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">Subtotal</span>

            <span className="text-gray-900">{totalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">Shipping</span>

            <span className="text-12px text-gray-600">
              calculated at next step
            </span>
          </div>
        </div>
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="split-line-thin my-20px"
        ></div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-semibold text-base">Total</span>

          <div className="flex items-end">
            <span className="text-gray-600 pr-2 text-sm">{'USD'}</span>
            <span className="font-semibold text-18px text-gray-800">
              {totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItems
