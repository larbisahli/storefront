import cn from 'clsx'
import { toggleCart, toggleMenu } from '@dropgala/store'
import CartIcon from '../../assets/icons/cart-icon'
import { HeartEmpty } from '../../assets/icons/heart'
import UserIcon from '../../assets/icons/user'
import { useAppDispatch } from '../../hooks/use-store'

const MyAccountActions = () => {
  const dispatch = useAppDispatch()

  const handleCart = () => {
    dispatch(toggleCart())
  }

  return (
    <div className="hidden lg:flex items-center">
      <button className="mx-2 text-black">
        <UserIcon width="25px" height="25px" />
      </button>
      <button className="mx-2 text-black">
        <HeartEmpty width="25px" height="25px" />
      </button>
      <button
        className="mx-2 flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
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
  )
}

export default MyAccountActions
