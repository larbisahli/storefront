import cn from 'clsx'
import { useEffect, useState } from 'react'

import CartIcon from '../../assets/icons/cart-icon'
import HomeSvg from '../../assets/icons/home'
import MenuSearchIcon from '../../assets/icons/menu-search'
import UserIcon from '../../assets/icons/user'

interface Props {
  handleCart: () => void
  handleMenu: () => void
}

const MobileHeader = ({ handleCart, handleMenu }: Props) => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false)
      } else {
        // if scroll up show the navbar
        setShow(true)
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <nav
      className={cn(
        'fixed w-full right-0 left-0 bottom-0 z-40 flex lg:!hidden',
        'items-center bg-gray-300 py-3 px-5 justify-between tra transition-transform',
        { 'translate-y-full': show, 'translate-y-0': !show }
      )}
    >
      <div className="mx-3 flex-1 flex justify-center">
        <button className="text-gray-800 hover:text-red-500">
          <HomeSvg width="25px" height="25px" />
        </button>
      </div>
      <div className="mx-3 flex-1 flex justify-center">
        <button
          className="text-gray-800 hover:text-red-500"
          onClick={handleMenu}
        >
          <MenuSearchIcon width="28px" height="28px" />
        </button>
      </div>
      <div className="mx-3 flex-1 flex justify-center">
        <button className="text-gray-800 hover:text-red-500">
          <UserIcon width="25px" height="25px" />
        </button>
      </div>
      <div className="mx-3 flex-1 flex justify-center">
        <button
          className="text-gray-800 flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none hover:text-red-500"
          onClick={handleCart}
          aria-label="cart-button"
        >
          <CartIcon width="22px" height="22px" />
          <span
            className={cn(
              'absolute bg-red-600 rounded-full h-[16px] w-[16px] text-center text-white',
              'top-[-10px] right-[-12px] font-semibold text-xs'
            )}
          >
            {3}
          </span>
        </button>
      </div>
    </nav>
  )
}

export default MobileHeader
