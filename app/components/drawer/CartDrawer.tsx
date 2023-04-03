// import { useAppDispatch, useAppSelector } from '@hooks/use-store';
// import { openMenu, slideCart } from '@store/drawer/index';
import cn from 'clsx'
// import Cart from 'containers/drawer/views/cart';
// import Checkout from 'containers/drawer/views/checkout';
import React from 'react'

const CartDrawer = () => {
  // const open = useAppSelector((state) => state.drawer.open);

  // const dispatch = useAppDispatch();

  const open = false

  // const handleClose = () => {
  //   dispatch(slideCart(false));
  // };

  return (
    <React.Fragment>
      {open ? (
        <div
          className="overlay"
          role="button"
          // onClick={handleClose}
        />
      ) : null}
      <div className={cn('drawer drawer-cart', { open })}>
        {/* <Cart /> */}
        {/* <Checkout /> */}
      </div>
    </React.Fragment>
  )
}

export default CartDrawer
