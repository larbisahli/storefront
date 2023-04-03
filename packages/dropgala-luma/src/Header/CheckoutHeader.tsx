// import ArrowRightFilled from '@assets/icons/fiiled-right-arrow';
// import SecureLock from '@assets/icons/secure-lock';
// import { useStorage } from '@hooks/use-storage';
// import { useAppDispatch, useAppSelector } from '@hooks/use-store';
// import { ProductType } from '@interfaces/index';
// import { rehydrate } from '@store/card/index';
// import Logo from 'assets/icons/logo';
import cn from 'clsx'
import Link from 'next/link'

function CheckoutHeader() {
  //   const items = useAppSelector((state) => state.cart.items);
  //   const dispatch = useAppDispatch();

  //   const rehydrateLocalState = (items: ProductType[]) => {
  //     dispatch(rehydrate(items));
  //   };

  //   // This component is global on all pages we are using it to get the items in local storage
  //   useStorage(items, rehydrateLocalState);

  return (
    <header
      className={cn(
        'flex items-center text-gray-700 body-font w-full h-50px border-b border-gray-300'
      )}
    >
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center">
          <Link href="/">
            <a className="relative">
              <span className="sr-only">Dropgala</span>
              {/* <Logo width="35px" id="dropgala-header-logo" /> */}
            </a>
          </Link>
          <div
            style={{ transform: 'rotate(30deg)' }}
            className="w-[1px] h-[30px] bg-gray-400 mx-3"
          ></div>
          <div style={{ color: '#83b293' }} className="flex items-center">
            <div>{/* <SecureLock width="23px" height="23px" /> */}</div>
            <div className="pl-2 text-xs">SECURE CHECKOUT</div>
          </div>
        </div>
        <Link href="/">
          <div className="flex items-center text-gray-600">
            <div className="pt-[2px] text-xs">CONTINUE SHOPPING</div>
            <div className="pl-2">
              {/* <ArrowRightFilled width="9px" height="9px" /> */}
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default CheckoutHeader
