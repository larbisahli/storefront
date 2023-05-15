// import AttributeDisplay from '../common/AttributeDisplay';
// import { usePrice } from '@dropgala/utils/hooks/usePrice'
// import cn from 'clsx';
// import { useRouter } from 'next/router';
// import React, { memo, useMemo, useState } from 'react';
// import dynamic from 'next/dynamic'

// // import CheckoutItemPopup from '../CheckoutItemPopup';
// import Counter from '../common/Counter';
// import { ProductType } from '@dropgala/types/product.type';
// import { ProductTypes } from '@dropgala/types';

// const Image = dynamic(() => import('../common/Image'))
// const Link = dynamic(() => import('../ui/Link'))

// type CartItemProps = {
//   item: ProductType;
//   disabled?: boolean;
// };

// const CheckoutCartItem: React.FC<CartItemProps> = ({
//   item,
//   disabled = false
// }) => {
//   const router = useRouter();
//   const { locale } = router;

//   let [isOpen, setIsOpen] = useState(false);

//   const {
//     name,
//     thumbnail,
//     slug,
//     type,
//     quantity,
//     salePrice,
//     comparePrice,
//     variations,
//     orderVariationOption
//   } = item;

//   const isVariableType = type?.id === ProductTypes.Variable;

//   const selectedSalePrice = isVariableType
//     ? orderVariationOption?.salePrice
//     : salePrice;
//   const selectedComparePrice = isVariableType
//     ? orderVariationOption?.comparePrice
//     : comparePrice;

//   const productQuantity = isVariableType
//     ? orderVariationOption?.quantity
//     : quantity;
//   const image = orderVariationOption?.image ?? thumbnail?.image;
//   const placeholder = thumbnail?.placeholder;

//   const price = usePrice({
//     amount: selectedSalePrice,
//     locale:locale!,
//     currencyCode: 'USD'
//   });

//   const productPrice = useMemo(
//     () =>
//       price
//         ?.replace(/(\.0+|0+)$/, '')
//         ?.split(/([0-9]+)/)
//         ?.filter((v) => v),
//     [price]
//   );

//   const discount = usePrice({
//     amount: selectedComparePrice,
//     locale:locale!,
//     currencyCode: 'USD'
//   });

//   const productDiscount = useMemo(
//     () => discount?.replace(/(\.0+|0+)$/, ''),
//     [discount]
//   );

//   const total = usePrice({
//     amount: selectedSalePrice * item.orderQuantity,
//     locale: locale!,
//     currencyCode: 'USD'
//   });

//   const totalPrice = useMemo(() => total?.replace(/(\.0+|0+)$/, ''), [total]);

//   const hideCart = () => {
//     dispatch(slideCart(false));
//   };

//   const handleOpenAttribute = () => {
//     setIsOpen(true);
//   };

//   return (
//     <div className="w-full h-auto flex justify-start items-start bg-white py-6 px-30px border-b border-gray-200 relative last:border-b-0">
//       {/* <CheckoutItemModal {...{ item, isOpen, setIsOpen }} /> */}
//       <Link
//         href={{
//           pathname: '/product/[slug]',
//           query: { slug }
//         }}
//         passHref
//       >
//         <a className="event flex w-110px h-165px rounded-sm overflow-hidden bg-gray-200 flex-shrink-0">
//           <div onClick={hideCart} className="relative">
//             <Image
//               src={image}
//               customPlaceholder={placeholder}
//               width={110}
//               height={165}
//               quality={100}
//               className="object-cover bg-skin-thumbnail rounded-sm"
//             />
//             <div
//               className="absolute right-0 bottom-0 left-0 bg-skin-black-rgba-6
//                text-white text-xs text-center py-[3px] font-bold"
//             >
//               {disabled && <span>Sold Out</span>}
//               {!disabled && <span>Almost sold out</span>}
//               {/* <span>Only 2 Left bg-skin-red-rgba-6</span> */}
//             </div>
//           </div>
//         </a>
//       </Link>

//       <div className="flex justify-between w-full px-15px">
//         <div className="flex flex-col flex-1">
//           <Link
//             href={{
//               pathname: '/product/[slug]',
//               query: { slug }
//             }}
//           >
//             <a
//               className={cn(
//                 'line-clamp-2 !text-[15px] hover:font-semibold sm:text-sm lg:text-[15px] leading-4 sm:leading-5 mb-1 text-gray-800',
//                 {
//                   'opacity-50 pointer-events-none': disabled
//                 }
//               )}
//             >
//               <div onClick={hideCart}>{name}</div>
//             </a>
//           </Link>

//           <div
//             className={cn(
//               'flex items-center text-13px text-gray-500 mt-3px mb-3px',
//               {
//                 'opacity-50': disabled
//               }
//             )}
//           >
//             <div>
//               {productPrice?.map((v, idx) => {
//                 if (v !== '$' && productPrice?.length !== idx + 1) {
//                   return (
//                     <span
//                       key={idx}
//                       className="inline-block text-[18px] lg:text-[19px] text-skin-base font-medium"
//                     >
//                       {v}
//                     </span>
//                   );
//                 }
//                 return (
//                   <span
//                     key={idx}
//                     className="inline-block text-[14px] lg:text-[15px] text-skin-base font-normal"
//                   >
//                     {v}
//                   </span>
//                 );
//               })}
//             </div>

//             {selectedComparePrice && (
//               <div className="flex items-center">
//                 <div className="bg-gray-400 h-[10px] w-[1px] mx-1"></div>
//                 <del
//                   style={{ color: '#a5a5a5' }}
//                   className="text-[13px] text-skin-base text-opacity-80"
//                 >
//                   {productDiscount}
//                 </del>
//               </div>
//             )}
//           </div>
//           {disabled && (
//             <div className="mt-3 text-skin-red text-xs">Reselect</div>
//           )}
//           <div className="flex items-center text-13px text-gray-500 mb-10px flex-wrap">
//             {variations?.map((variation) => {
//               return (
//                 <div
//                   key={variation?.attribute?.id}
//                   className="pr-2 flex items-center my-1"
//                 >
//                   <span className="text-skin-base">
//                     {variation?.attribute?.name}:
//                   </span>
//                   <AttributeDisplay
//                     {...{
//                       orderVariationOption,
//                       variations,
//                       variation
//                     }}
//                     onClick={handleOpenAttribute}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <div
//             className={cn('flex items-center justify-between', {
//               'opacity-50 pointer-events-none': disabled
//             })}
//           >
//             <Counter
//               value={item.orderQuantity}
//               onIncrement={() => {
//                 dispatch(incrementItem(item));
//               }}
//               onDecrement={() => {
//                 dispatch(decrementItem(item));
//               }}
//               disabled={productQuantity - item.orderQuantity <= 0}
//             />
//           </div>
//           {disabled && (
//             <button
//               onClick={() => {
//                 dispatch(removeItem(item));
//               }}
//               className="mt-3 bg-gray-300 py-1 px-4 rounded-full text-black hover:font-semibold text-xs cursor-pointer pointer-events-auto opacity-none w-fit"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//         <div
//           className={cn('flex items-center', {
//             'opacity-50': disabled
//           })}
//         >
//           <span className="font-semibold text-16px text-gray-900 flex-shrink-0">
//             {totalPrice}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default memo(CheckoutCartItem);

const CheckoutCartItem = () => null
export default CheckoutCartItem
