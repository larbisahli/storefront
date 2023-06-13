import cn from 'clsx'

import CartIcon from '../../assets/icons/cart-icon'
import { HeartEmpty } from '../../assets/icons/heart'
import UserIcon from '../../assets/icons/user'

interface Props {
  handleCart: () => void
  itemsCount: number
}

const MyAccountActions = ({ handleCart, itemsCount }: Props) => {
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
        <div
          className={cn(
            'absolute bg-red-700 rounded-full h-[17px] w-[17px] text-center text-white',
            'top-[-10px] right-[-12px] font-semibold text-xs flex items-center justify-center'
          )}
        >
          <span>{itemsCount}</span>
        </div>
      </button>
    </div>
  )
}

export default MyAccountActions
