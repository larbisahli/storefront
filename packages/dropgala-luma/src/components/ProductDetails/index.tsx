import LabelIcon from '../../assets/icons/label-icon'
import Counter from '../common/Counter'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import TagLabel from '../ui/TagLabel'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction, memo, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

import { ProductTypes } from '@dropgala/types'
import type {
  AttributeType,
  AttributeValueType
} from '@dropgala/types/attribute.type'
import type {
  CartItemType,
  ProductType,
  VariationOptionsType,
  VariationsType
} from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { selectedVariationOptionFun } from '@dropgala/utils/utils'

const Image = dynamic(() => import('../common/Image'))

const ProductDetailsTab = dynamic(() => import('./ProductDetailTab'), {
  ssr: false
})
const ProductAttributes = dynamic(() => import('./ProductAttributes'), {
  ssr: false
})
const VariationPrice = dynamic(() => import('./VariationPrice'), { ssr: false })

interface Props {
  product: ProductType
  cartItems: CartItemType[]
  addToCart: () => void
  selectedQuantity: number
  setSelectedQuantity: Dispatch<SetStateAction<number>>
  selectedVariations: VariationsType[]
  setSelectedVariations: Dispatch<SetStateAction<VariationsType[]>>
  selectedVariationOption: VariationOptionsType
}

const ProductDetails = ({
  product,
  addToCart,
  selectedQuantity,
  setSelectedQuantity,
  selectedVariations,
  setSelectedVariations,
  selectedVariationOption
}: Props) => {
  const { t } = useTranslation('common')

  const {
    id,
    name,
    salePrice,
    comparePrice,
    quantity,
    type,
    description,
    thumbnail,
    gallery,
    tags,
    variations,
    variationOptions
  } = product ?? {}

  const { image = '', placeholder = '' } = !isEmpty(thumbnail)
    ? thumbnail![0]
    : {}

  const isVariableType = type?.id === ProductTypes.Variable

  // const [swiperThumbnailInstance, setSwiperThumbnailInstance] =
  //   useState<SwiperType>(null);

  // const selectedIndex = useMemo(
  //   () =>
  //     gallery?.findIndex((i) => i?.image === selectedVariationOption?.image),
  //   [gallery, selectedVariationOption]
  // );

  const productLoading = isEmpty(product)
  const productQuantity =
    (isVariableType ? selectedVariationOption?.quantity : quantity) ?? 0

  // useEffect(() => {
  //   if (
  //     !isNaN(selectedIndex) &&
  //     !isEmpty(swiperThumbnailInstance) &&
  //     !swiperThumbnailInstance?.destroyed
  //   ) {
  //     swiperThumbnailInstance.slideTo(selectedIndex);
  //   }
  // }, [selectedIndex, swiperThumbnailInstance]);

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
        <div className="col-span-5 xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          <div className="max-w-[650px] 2xxl:max-w-[750px] lg:mx-0 mx-auto">
            {/* {!isEmpty(gallery) ? (
              <ThumbnailCarousel
                setSwiperThumbnailInstance={setSwiperThumbnailInstance}
                gallery={gallery}
                thumbnailClassName="max-w-[650px] 2xxl:max-w-[750px]"
                galleryClassName="w-full"
              />
            ) : (
              <div className="w-auto flex items-center justify-center">
                <Image
                  src={thumbnail?.image}
                  customPlaceholder={thumbnail?.placeholder}
                  width={750}
                  height={690}
                />
              </div>
            )} */}
            <div className="w-auto flex items-center justify-center">
              <Image
                src={image}
                customPlaceholder={placeholder}
                width={750}
                height={690}
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-4 xl:ps-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block">
              <h2 className="text-skin-base text-lg md:text-xl font-medium transition-colors duration-300 mb-2">
                {name}
              </h2>
            </div>
            <div className="split-line-thin"></div>
            <VariationPrice
              salePrice={salePrice!}
              comparePrice={comparePrice!}
              selectedVariationOption={selectedVariationOption}
              isVariableType={isVariableType}
            />
          </div>
          <div className="split-line-thin"></div>

          {/* VARIATIONS */}
          <div className="my-3">
            {variations?.map((variation) => {
              return (
                <ProductAttributes
                  key={variation?.attribute?.id}
                  {...{
                    variation,
                    variations,
                    variationOptions,
                    selectedVariations,
                    setSelectedVariations
                  }}
                />
              )
            })}
          </div>

          {/* QUANTITY */}
          <div>
            <span className="text-skin-base">Quantity:</span>
            <div className="mt-2 flex items-center">
              <div className="w-24">
                <Counter
                  single
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={productQuantity - selectedQuantity <= 0}
                />
              </div>
              <div className="pl-2">
                {!productLoading && (
                  <>
                    {productQuantity > 0 && productQuantity <= 5 ? (
                      <Badge
                        backgroundColor="bg-gray-200"
                        textColor="text-skin-red"
                        border="border border-sink-base"
                      >
                        {t('text-only') +
                          ' ' +
                          productQuantity +
                          ' ' +
                          t('text-left')}
                      </Badge>
                    ) : (
                      <div className=""></div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5 mt-5">
            <div className="flex items-center max-w-lg">
              <Button
                onClick={addToCart}
                disabled={productQuantity === 0}
                className={cn(
                  'bg-gray-900 text-white font-semibold text-lg mr-2 flex-1',
                  { 'bg-gray-700': productQuantity === 0 }
                )}
              >
                {productQuantity === 0
                  ? t('text-sold-out')
                  : t('text-add-to-cart')}
              </Button>
            </div>
          </div>
          {!isEmpty(tags) && (
            <ul className="pt-5 xl:pt-6">
              <li className="text-sm md:text-15px text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                <LabelIcon className="mr-2" /> {t('text-tags')}:
              </li>
              {tags?.map((item) => (
                <li className="inline-block p-[3px]" key={`tag-${item?.id}`}>
                  <TagLabel data={item!} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <ProductDetailsTab description={description!} />
      </div>
    </div>
  )
}

export default memo(ProductDetails)
