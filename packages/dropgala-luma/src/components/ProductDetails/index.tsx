import LabelIcon from '../../assets/icons/label-icon'
import Counter from '../common/Counter'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import TagLabel from '../ui/TagLabel'
import cn from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { Navigation } from 'swiper/modules'

import { ProductTypes } from '@dropgala/types'
import type { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import type { ImageType } from '@dropgala/types/common.type'
import { HeartEmpty } from '../../assets/icons/heart'
import {
  StoreProps,
  addItem,
  selectCart,
  selectConfig,
  setOrderQuantity,
  toggleCart
} from '@dropgala/store'
import type {
  AttributeType,
  AttributeValueType
} from '@dropgala/types/attribute.type'
import { selectedVariationOptionFun } from '@dropgala/utils/utils'
import Image from '../common/Image'
import ProductDescription from './ProductDescription'
import ProductAttributes from './ProductAttributes'
import VariationPrice from './VariationPrice'
import { Swiper, SwiperSlide } from 'swiper/react'
import useWindowSize from 'hooks/useWindowSize'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import StarIcon from '../../assets/icons/star'

interface Props extends StoreProps {
  product: ProductType
}

const ProductDetails = ({ product, useAppDispatch, useAppSelector }: Props) => {
  // const { t } = useTranslation()

  const cart = useAppSelector(selectCart)
  const { device, language } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  const dispatch = useAppDispatch()

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [selectedVariations, setSelectedVariations] = useState<
    { attribute: AttributeType; value: AttributeValueType }[]
  >([])
  const [swiper, setSwiper] = useState(null)

  const [actualSlide, setActualSlide] = useState(0)
  const [productGallery, setProductGallery] = useState<ImageType[]>([])

  const cartItems = cart.items

  const {
    id,
    name,
    salePrice,
    comparePrice,
    quantity,
    sku,
    disableOutOfStock,
    type,
    description,
    thumbnail,
    gallery = [],
    tags,
    variations,
    variationOptions
  } = product ?? {}

  const { image = '', placeholder = '' } = !isEmpty(thumbnail)
    ? thumbnail![0]
    : {}

  const isConfigurable = type === ProductTypes.Variable

  const selectedVariationOption = useMemo(() => {
    return selectedVariationOptionFun({
      selectedVariations,
      variationOptions
    })
  }, [selectedVariations, variationOptions])

  const selectedIndex = useMemo(() => {
    if (isEmpty(productGallery)) {
      return 0
    }
    return productGallery?.findIndex(
      (i) => i?.id === selectedVariationOption?.thumbnail[0]?.id
    )
  }, [productGallery, selectedVariationOption])

  useEffect(() => {
    const { thumbnail = [] } = selectedVariationOption ?? {}

    if (
      !isEmpty(thumbnail) &&
      isEmpty(
        productGallery?.find(
          (img) => thumbnail.length > 0 && img.id !== thumbnail[0]?.id
        )
      )
    ) {
      setProductGallery((prev) => [...prev, ...thumbnail])
    }
  }, [selectedVariationOption, gallery])

  useEffect(() => {
    setProductGallery(gallery)
  }, [gallery])

  const productQuantity =
    (isConfigurable ? selectedVariationOption?.quantity : quantity) ?? 0

  const productSku = isConfigurable ? selectedVariationOption?.sku : sku

  const isSoldOut = productQuantity === 0

  function addToCart() {
    const items = cartItems?.filter((item: ProductType) => item.id === id)
    const orderQuantity = selectedQuantity

    if (isConfigurable) {
      const variationOptionExist = items?.find((item) => {
        return (
          !!item?.orderVariationOption?.id &&
          !!selectedVariationOption?.id &&
          item?.orderVariationOption.id === selectedVariationOption?.id
        )
      })

      if (isEmpty(variationOptionExist)) {
        dispatch(
          addItem({
            ...product,
            orderQuantity,
            orderVariationOption: selectedVariationOption
          })
        )
      } else {
        const key = variationOptionExist.key
        dispatch(
          setOrderQuantity({
            key,
            type,
            orderQuantity
          })
        )
      }
    } else {
      const item = items[0]
      if (isEmpty(item)) {
        dispatch(
          addItem({
            ...product,
            orderQuantity
          })
        )
      } else {
        dispatch(
          setOrderQuantity({
            id,
            type,
            orderQuantity
          })
        )
      }
    }

    dispatch(toggleCart())
    setSelectedQuantity(1)
  }

  const renderGallery = () => {
    if (isEmpty(gallery)) {
      return (
        <div className="w-auto flex items-center justify-center">
          <Image
            src={image}
            customPlaceholder={placeholder}
            width={650}
            height={650}
            objectFit="cover"
          />
        </div>
      )
    }

    const slideTo = (index: number) => swiper && swiper.slideTo(index)

    const { width: windowWidth = 0 } = useWindowSize()
    const maxWidth = windowWidth > 600 ? '600px' : `${windowWidth}px`

    return (
      <div className="flex flex-col lg:flex-row-reverse" style={{ maxWidth }}>
        <div
          className="flex-1"
          style={{ maxWidth: device?.isDesktop ? 'calc(100% - 50px)' : '100%' }}
        >
          <Swiper
            loop
            onSlideChange={(swiper) => {
              setSwiper(swiper)
              setActualSlide(swiper?.realIndex)
            }}
            navigation={device?.isDesktop}
            modules={[Navigation]}
            className="max-w-fit"
          >
            {productGallery?.map(
              ({ id, image, placeholder }: ImageType, idx) => (
                <SwiperSlide key={`product--key${id}`}>
                  <Image
                    key={`${id}-${idx}`}
                    src={image}
                    customPlaceholder={placeholder}
                    width={600}
                    height={600}
                    objectFit="cover"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
        <div className="flex w-full lg:w-[50px] max-h-[600px] items-center flex-row lg:flex-col justify-center lg:justify-start">
          {productGallery?.map(({ id, image, placeholder }, index) => {
            return (
              <button
                key={id}
                className={cn(
                  'm-1 md:h-45px md:w-45px h-35px w-35px border border-gray-100 transition-all',
                  { '!border-red-600': index === actualSlide ?? 0 }
                )}
                onClick={() => {
                  slideTo(index)
                }}
              >
                <Image
                  src={image}
                  customPlaceholder={placeholder}
                  width={45}
                  height={45}
                  objectFit="cover"
                />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDesktopProductActions = () => {
    return (
      <>
        {/* QUANTITY */}
        <div className="mt-2 flex items-center">
          <Counter
            single
            size={'big'}
            value={selectedQuantity}
            onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
            onDecrement={() =>
              setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
            }
            disabled={productQuantity - selectedQuantity <= 0}
          />
          <div className="pl-2">
            {productQuantity > 0 && productQuantity <= 5 ? (
              <Badge textColor="!text-red-600 capitalize">
                {__('only %s left', productQuantity)}
              </Badge>
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
        {/* BUTTONS */}
        <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5 mt-5">
          <div className="flex items-center w-full">
            <Button
              onClick={addToCart}
              disabled={productQuantity === 0}
              className={cn(
                'bg-gray-900 hover:bg-gray-800 text-white rounded-sm font-semibold text-lg mr-2 flex-1 h-[50px]',
                { '!bg-gray-700': productQuantity === 0 }
              )}
            >
              {productQuantity === 0 ? __('sold out') : __('Add to cart')}
            </Button>
            <Button className="border rounded-sm h-[50px] !px-3 border-black flex flex-0 items-center justify-center m-1">
              <HeartEmpty className="text-black" width={25} height={25} />
            </Button>
          </div>
        </div>
      </>
    )
  }

  const renderMobileProductActions = () => {
    return (
      <div className="fixed flex justify-between items-center bottom-[52px] z-10 bg-white left-0 right-0 px-2 py-3 border-t border-gray-300">
        {/* QUANTITY */}
        <div className="flex items-center">
          <Counter
            single
            size={'big'}
            value={selectedQuantity}
            onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
            onDecrement={() =>
              setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
            }
            disabled={productQuantity - selectedQuantity <= 0}
          />
        </div>
        {/* BUTTONS */}
        <div className="pl-2 flex-1">
          <div className="flex items-center w-full">
            <Button
              onClick={addToCart}
              disabled={productQuantity === 0}
              className={cn(
                'bg-gray-900 hover:bg-gray-800 text-white rounded-sm font-semibold text-lg mr-2 flex-1 h-[45px]',
                { '!bg-gray-700': productQuantity === 0 }
              )}
            >
              {productQuantity === 0 ? __('sold out') : __('Add to cart')}
            </Button>
            <Button className="border rounded-sm h-[45px] !px-2 border-black flex flex-0 items-center justify-center">
              <HeartEmpty className="text-black" width={25} height={25} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderTags = () => {
    if (isEmpty(tags)) {
      return null
    }

    return (
      <ul className="pt-5 xl:pt-6">
        <li
          className="text-sm md:text-15px text-base text-opacity-80 inline-flex
                      items-center justify-center me-2 relative top-1"
        >
          <LabelIcon className="mr-2" /> {__('Tags')}:
        </li>
        {tags?.map((item) => (
          <li className="inline-block p-[3px]" key={`tag-${item?.id}`}>
            <TagLabel data={item!} />
          </li>
        ))}
      </ul>
    )
  }

  const renderProductActions = () => {
    if (device?.isMobile) {
      return renderMobileProductActions()
    }
    return renderDesktopProductActions()
  }

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="flex flex-col lg:flex-row justify-between h-full">
        <div className="relative flex-1 mb-6 md:mb-8 lg:mb-0">
          <div className="max-w-[600px] xl:max-w-[700px] sticky top-[200px] h-fit overflow-hidden lg:mx-0 mx-auto">
            {renderGallery()}
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col w-full flex-1 xl:ps-2 lg:ml-2 px-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block">
              <h2 className="text-skin-base text-xl md:text-3xl font-semibold transition-colors duration-300 mb-2">
                {name}
              </h2>
              {/* Product Ratings */}
              <div className="flex items-center mb-1 text-orange-600">
                <StarIcon width={18} height={18} />
                <StarIcon width={18} height={18} />
                <StarIcon width={18} height={18} />
                <StarIcon width={18} height={18} />
                <StarIcon width={18} height={18} />
                <div className="text-xs font-bold text-black">{`(${5})`}</div>
                <button className="text-sm font-bold text-red-700 px-4">
                  {__('Write a review')}
                </button>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <div className="flex justify-between items-center pt-4">
              <VariationPrice
                salePrice={salePrice!}
                comparePrice={comparePrice!}
                selectedVariationOption={selectedVariationOption}
                isConfigurable={isConfigurable}
                useAppSelector={useAppSelector}
                useAppDispatch={useAppDispatch}
              />
              {productSku && (
                <div className="text-gray-600 uppercase flex flex-col items-end">
                  <div className="text-xs font-medium text-gray-900">
                    {isSoldOut ? __('Out of stock') : __('In stock')}
                  </div>
                  <span className="text-sm">{`SKU: ${productSku}`}</span>
                </div>
              )}
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-300"></div>
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
                    setSelectedVariations,
                    isConfigurable,
                    language
                  }}
                />
              )
            })}
          </div>
          {renderProductActions()}
          {/* Tags */}
          {renderTags()}
          {/* Description */}
          <ProductDescription description={description ?? ''} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
