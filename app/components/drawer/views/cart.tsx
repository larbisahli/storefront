import CartItem from '@components/common/cart-item';
import { Scrollbar } from '@components/common/scrollbar';
import Button from '@components/ui/button';
import { usePrice } from '@hooks/use-price';
import {
  useAppDispatch,
  useAppSelector,
  useCartItemsCount,
  UseCartItemsTotalPrice
} from '@hooks/use-store';
import { siteSettings } from '@settings/site-settings';
import { slideCart } from '@store/drawer/index';
import ArrowLeft from 'assets/icons/arrow-left';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

import NoItem from './no-item';

function Cart() {
  const router = useRouter();
  const { locale } = router;

  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const calculatePrice = UseCartItemsTotalPrice();
  const itemsCount = useCartItemsCount();

  const hideCart = () => {
    dispatch(slideCart(false));
  };

  const totalPrice = usePrice({
    amount: calculatePrice,
    locale,
    currencyCode: siteSettings?.currencyCode
  });

  return (
    <div className="flex flex-col w-full h-full">
      {items?.length ? (
        <>
          <div className="w-full flex justify-center relative px-30px py-20px border-b border-gray-200">
            <button
              className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
              onClick={hideCart}
              aria-label="close"
            >
              <ArrowLeft />
            </button>

            <h2 className="font-bold text-24px m-0">Your Basket</h2>
          </div>

          <Scrollbar className="cart-scrollbar flex-grow">
            {items?.map((item) => (
              <CartItem item={item} key={item.key} />
            ))}
          </Scrollbar>
        </>
      ) : (
        <NoItem />
      )}

      <div
        style={{ background: 'rgba(0,0,0,0.05)' }}
        className="flex flex-col p-30px bg-red-100"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Shipping</span>

          <span className="text-12px text-gray-600 uppercase">
            calculated at checkout
          </span>
        </div>
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="split-line-thin my-5px"
        ></div>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">
            Subtotal
            {/* &nbsp;
            <span className="font-normal text-gray-700 text-13px">
              (Incl. VAT)
            </span> */}
          </span>

          <span className="font-semibold text-18px text-gray-900">
            {totalPrice}
          </span>
        </div>

        {itemsCount > 0 ? (
          <Link
            href={{
              pathname: '/cart'
            }}
            passHref
          >
            <a className="w-full mt-20px flex">
              <Button
                className="!w-full text-white bg-black font-medium"
                disabled={false}
                onClick={hideCart}
              >
                View bag ({itemsCount})
              </Button>
            </a>
          </Link>
        ) : (
          <Button
            className="!w-full text-white bg-black font-medium"
            disabled={true}
          >
            View bag
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(Cart);
