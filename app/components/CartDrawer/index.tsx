import { CloseIcon } from '@assets'
import Overlay from '@components/common/Overlay'
import { selectConfig, selectDrawer, toggleCart } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'
import cn from 'clsx'
import React from 'react'

const CartDrawer = () => {
  const { isOpen, isCart } = useAppSelector(selectDrawer)
  const { theme } = useAppSelector(selectConfig)

  const dispatch = useAppDispatch()

  const handleCloseCart = () => {
    dispatch(toggleCart())
  }

  const isCartOpen = isOpen && isCart

  return (
    <React.Fragment>
      <Overlay isOpen={isCartOpen} onClose={handleCloseCart} />
      <div className={cn('drawer drawer-cart', { open: isCartOpen })}>
        <div>
          <button className="px-4 py-3 text-gray-800" onClick={handleCloseCart}>
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        {componentFactory(theme, ComponentNames.CART_DRAWER, {})}
      </div>
    </React.Fragment>
  )
}

export default CartDrawer
