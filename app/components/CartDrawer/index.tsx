import { CloseIcon } from '@assets'
import Overlay from '@components/common/Overlay'
import {
  selectCart,
  selectConfig,
  selectDrawer,
  toggleCart,
  incrementItem as incrementCartItem,
  decrementItem as decrementCartItem
} from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { CartItemType } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'
import cn from 'clsx'
import React from 'react'

const CartDrawer = () => {
  const { isOpen, isCart } = useAppSelector(selectDrawer)
  const cart = useAppSelector(selectCart)
  const { theme } = useAppSelector(selectConfig)

  const dispatch = useAppDispatch()

  const handleCloseCart = () => {
    dispatch(toggleCart())
  }

  const isCartOpen = isOpen && isCart

  const incrementItem = (item: CartItemType) => {
    dispatch(incrementCartItem(item))
  }

  const decrementItem = (item: CartItemType) => {
    dispatch(decrementCartItem(item))
  }

  return (
    <React.Fragment>
      <Overlay isOpen={isCartOpen} onClose={handleCloseCart} />
      <div className={cn('drawer drawer-cart', { open: isCartOpen })}>
        <div>
          <button className="px-4 py-3 text-gray-800" onClick={handleCloseCart}>
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        {renderRemoteComponent(theme, ComponentNames.CART_DRAWER, {
          cart,
          incrementItem,
          decrementItem,
          handleCloseCart
        })}
      </div>
    </React.Fragment>
  )
}

export default CartDrawer
