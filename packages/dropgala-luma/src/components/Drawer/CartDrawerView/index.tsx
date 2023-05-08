import { usePrice } from '@dropgala/utils/hooks/usePrice'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import { siteSettings } from '../../../settings/site-settings'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { CartItemType, CartState } from '@dropgala/types/product.type'
import { UseCartItemsTotalPrice } from '../../../hooks/useCartItemsTotalPrice'
import { useCartItemsCount } from '../../../hooks/useCartItemsCount'

const Link = dynamic(() => import('../../ui/Link'))
const Scrollbar = dynamic(() => import('../../common/Scrollbar'))

interface Props {
  cart: CartState
  itemsCount: number
  incrementItem: (item: CartItemType) => void
  decrementItem: (item: CartItemType) => void
  handleCloseCart: () => void
}

function CartDrawerView({
  cart,
  incrementItem,
  decrementItem,
  handleCloseCart
}: Props) {
  const router = useRouter()
  const { locale = '' } = router

  const { items = [] } = cart

  const calculatePrice = UseCartItemsTotalPrice(cart)
  const itemsCount = useCartItemsCount(cart)

  const totalPrice = usePrice({
    amount: calculatePrice,
    locale,
    currencyCode: siteSettings?.currencyCode
  })

  const renderContent = () => {
    if (items?.length === 0) {
      return <EmptyCart />
    }
    return (
      <>
        <div className="w-full flex absolute justify-center top-0 z-[-1] px-30px border-b border-gray-200">
          <h2 className="font-bold text-24px m-0">Your Basket</h2>
        </div>

        <Scrollbar className="cart-scrollbar flex-grow">
          {items?.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
              handleCloseCart={handleCloseCart}
            />
          ))}
        </Scrollbar>
      </>
    )
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1">{renderContent()}</div>
      <div
        style={{ background: 'rgba(0,0,0,0.05)' }}
        className="flex flex-col p-30px lg:pb-30px pb-[75px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Shipping</span>

          <span className="text-12px text-gray-600 uppercase">
            calculated at checkout
          </span>
        </div>
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="split-line-thin my-5px"
        ></div>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">
            Subtotal &nbsp;
            <span className="font-normal text-gray-700 text-13px">
              (Incl. VAT)
            </span>
          </span>

          <span className="font-semibold text-18px text-gray-900">
            {totalPrice}
          </span>
        </div>

        {itemsCount > 0 ? (
          <div className="w-full mt-20px flex justify-between">
            <Link
              href={{
                pathname: '/cart'
              }}
              passHref
              className="w-fit"
            >
              <Button
                className="whitespace-nowrap !px-3 text-[14px] !text-gray-900 hover:text-black bg-white border-2 border-gray-900 hover:border-black font-semibold rounded-sm"
                disabled={false}
                onClick={handleCloseCart}
              >
                View Cart ({itemsCount})
              </Button>
            </Link>
            <Link
              href={{
                pathname: '/checkout'
              }}
              passHref
              className="ml-3 flex-1"
            >
              <Button
                className="text-white w-full bg-gray-900 hover:bg-black font-semibold text-[14px] rounded-sm"
                disabled={false}
                onClick={handleCloseCart}
              >
                secure checkout
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            className="!w-full text-white bg-black font-medium"
            disabled={true}
          >
            View bag
          </Button>
        )}
      </div>
    </div>
  )
}

export default CartDrawerView
