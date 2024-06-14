import cn from 'clsx'
import IconPlaceholder from '@dropgala/assets/placeholders/icon'
import dynamic from 'next/dynamic'

const UserIcon = dynamic(() => import('@dropgala/assets/icons/user'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

const CartIcon = dynamic(() => import('@dropgala/assets/icons/cart-icon'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

const HeartEmpty = dynamic(
  () => import('@dropgala/assets/icons/heart').then((mod) => mod.HeartEmpty),
  {
    loading: () => <IconPlaceholder />,
    ssr: false
  }
)

interface Props {
  handleCart: () => void
  itemsCount: number
}

const MyAccountActions = ({ handleCart, itemsCount }: Props) => {
  return (
    <div className="hidden desktop:flex items-center">
      {/* ltr:bg-red-500 rtl:bg-blue-500 */}
      <button className="mx-2 text-black">
        <UserIcon width={25} height={25} />
      </button>
      <button className="mx-2 text-black">
        <HeartEmpty width={25} height={25} />
      </button>
      <button
        className="mx-2 flex group/cart items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        onClick={handleCart}
        aria-label="cart-button"
      >
        <CartIcon width={22} height={22} />
        <div
          className={cn(
            'absolute bg-[color:var(--primary-color)] group-hover/cart:bg-[color:var(--primary-hover-color)] rounded-full h-[19px] w-[19px] text-center text-white',
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
