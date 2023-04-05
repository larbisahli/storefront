import cn from 'clsx'
import React from 'react'
import { toggleCart } from '@dropgala/store'
import { useAppSelector, useAppDispatch } from '@hooks/use-store'
import { CloseIcon } from '@assets'
import { renderComponent } from '@lib/packages'
import { ComponentNames } from '@dropgala/types/enums.type'

const STOREFRONT_THEME = '@dropgala/luma'

const CartDrawer = () => {
  const { isOpen, isCart } = useAppSelector((state) => state.drawer)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(toggleCart())
  }

  return (
    <React.Fragment>
      {isOpen && isCart ? (
        <div className="overlay" role="button" onClick={handleClose} />
      ) : null}
      <div className={cn('drawer drawer-cart', { open: isOpen && isCart })}>
        <div>
          <button className="px-4 py-3 text-gray-800" onClick={handleClose}>
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        <div className="">
          {renderComponent(
            STOREFRONT_THEME,
            ComponentNames.CART_DRAWER_VIEW,
            {}
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CartDrawer
