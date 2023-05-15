import dynamic from 'next/dynamic'
import ArrowRightFilled from '../../assets/icons/filed-right-arrow'
import SecureLock from '../../assets/icons/secure-lock'
import cn from 'clsx'

const Link = dynamic(() => import('../ui/Link'))

function CheckoutHeader() {
  return (
    <header
      className={cn(
        'flex items-center text-gray-700 body-font w-full h-50px border-b border-gray-300'
      )}
    >
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center">
          <Link href="/">
            <div className="relative">
              <span className="sr-only">{`Dropgala`}</span>
              {/* <Logo width="35px" id="dropgala-header-logo" /> */}
            </div>
          </Link>
          <div
            style={{ transform: 'rotate(30deg)' }}
            className="w-[1px] h-[30px] bg-gray-400 mx-3"
          ></div>
          <div style={{ color: '#83b293' }} className="flex items-center">
            <div>
              <SecureLock width="23px" height="23px" />
            </div>
            <div className="pl-2 text-xs uppercase">Secure checkout</div>
          </div>
        </div>
        <Link href="/">
          <div className="flex items-center text-gray-600">
            <div className="pt-[2px] text-xs uppercase">Continue shopping</div>
            <div className="pl-2">
              <ArrowRightFilled width="9px" height="9px" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default CheckoutHeader
