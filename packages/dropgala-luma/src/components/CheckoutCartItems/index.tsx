// // import CheckoutCartItem from '@components/common/checkout-cart-item';
// // import Button from '@components/ui/button';
// // import CartItemLoader from '@components/ui/loaders/cart-item-loader';
// import { ProductTypes } from '@dropgala/types';
// import { ProductType } from '@dropgala/types/product.type';
// import { isEmpty } from '@dropgala/utils/lodashFunctions';
// import { useEffect, useMemo } from 'react';

// const CheckoutCartItems = ({cart}) => {

//   const { cartItems, outOfStockItems } = useMemo(() => {
//     const cartItems = items?.filter((item) => {
//       if (item.type.id === ProductTypes.Simple) {
//         return item.quantity > 0;
//       } else {
//         return item.orderVariationOption?.quantity > 0;
//       }
//     });
//     const outOfStockItems = items?.filter((item) => {
//       if (item.type.id === ProductTypes.Simple) {
//         return item.quantity === 0;
//       } else {
//         return item.orderVariationOption?.quantity === 0;
//       }
//     });
//     return { cartItems, outOfStockItems };
//   }, [items]);

//   return (
//     <div className="w-full h-full mt-5 relative last:border-b-0">
//       <div className="bg-white z-10 sticky top-0 w-full py-6 px-30px border-b border-gray-200">
//         <h2 className="font-bold text-lg">Item Summary ({itemsCount})</h2>
//       </div>
//       {/* IN STOCK */}
//       <div className="">
//         {cartItems?.map((item) => (
//             <CheckoutCartItem item={item} key={item.key} />
//           ))}
//       </div>
//       {/* OUT OF STOCK */}
//       {!isEmpty(outOfStockItems) && (
//         <div className="mt-5">
//           <div className="bg-white shadow z-20 sticky top-0 w-full py-6 px-30px border-y border-gray-200 flex items-center justify-between">
//             <h2 className="font-bold text-lg">Out of stock</h2>
//             <Button className="text-white bg-black !font-bold text-xs !w-20 !h-7 !p-0 !rounded-[2px]">
//               <div className="lowercase first-letter:capitalize">Move All</div>
//             </Button>
//           </div>
//           <div>
//             {outOfStockItems?.map((item) => (
//               <CheckoutCartItem item={item} key={item.key} disabled />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

const CheckoutCartItems = () => null
export default CheckoutCartItems
