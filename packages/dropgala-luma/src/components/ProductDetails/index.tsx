import LabelIcon from '../../assets/icons/label-icon'
import Counter from '../common/Counter'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import TagLabel from '../ui/TagLabel'
import cn from 'clsx'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

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

const Image = dynamic(() => import('../common/Image'))
const Slider = dynamic(() => import('../common/Slider'))
const ProductDescription = dynamic(() => import('./ProductDescription'), {
  ssr: false
})
const ProductAttributes = dynamic(() => import('./ProductAttributes'), {
  ssr: false
})
const VariationPrice = dynamic(() => import('./VariationPrice'), { ssr: false })

interface Props extends StoreProps {
  product: ProductType
}

const ProductDetails = ({ product, useAppDispatch, useAppSelector }: Props) => {
  const { t } = useTranslation()

  const cart = useAppSelector(selectCart)

  const dispatch = useAppDispatch()

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [selectedVariations, setSelectedVariations] = useState<
    { attribute: AttributeType; value: AttributeValueType }[]
  >([])

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

  const isVariableType = type?.id === ProductTypes.Variable

  const selectedVariationOption = useMemo(() => {
    return selectedVariationOptionFun({
      selectedVariations,
      variationOptions
    })
  }, [selectedVariations, variationOptions])

  const updateSlide = ({ currentSlide }: any) => {
    setActualSlide(currentSlide)
  }

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
    (isVariableType ? selectedVariationOption?.quantity : quantity) ?? 0

  const productSku = isVariableType ? selectedVariationOption?.sku : sku

  const isSoldOut = productQuantity === 0

  useEffect(() => {
    if (selectedIndex >= 0) {
      updateSlide({ currentSlide: selectedIndex })
    } else {
      updateSlide({ currentSlide: 0 })
    }

    return () => {
      updateSlide({ currentSlide: 0 })
    }
  }, [selectedIndex])

  useEffect(() => {
    updateSlide({ currentSlide: 0 })
  }, [id])

  function addToCart() {
    const items = cartItems?.filter((item: ProductType) => item.id === id)
    const orderQuantity = selectedQuantity

    if (isVariableType) {
      const variationOptionExist = items?.find((item) => {
        return (
          !!item?.orderVariationOption?.id &&
          !!selectedVariationOption?.id &&
          item?.orderVariationOption.id === selectedVariationOption?.id
        )
      })

      console.log({ variationOptionExist })
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

    return (
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="max-w-[600px] ">
          {/* @ts-ignore */}
          <Slider infiniteLoop doAfterSlide={updateSlide} slide={actualSlide}>
            {productGallery?.map(
              ({ id, image, placeholder }: ImageType, idx) => (
                <Image
                  key={`${id}-${idx}`}
                  src={image}
                  customPlaceholder={placeholder}
                  width={600}
                  height={600}
                  objectFit="cover"
                />
              )
            )}
          </Slider>
        </div>
        <div className="flex w-full lg:w-[50px] max-h-[600px] items-center flex-row lg:flex-col justify-center lg:justify-start">
          {productGallery?.map(({ id, image, placeholder }, index) => {
            return (
              <button
                key={id}
                className={cn(
                  'm-1 md:h-45px md:w-45px h-35px w-35px border border-gray-100 transition-all',
                  { '!border-red-600': index === actualSlide }
                )}
                onClick={() => {
                  console.log({ index })
                  updateSlide({ currentSlide: index })
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
          <LabelIcon className="mr-2" /> {t('text-tags')}:
        </li>
        {tags?.map((item) => (
          <li className="inline-block p-[3px]" key={`tag-${item?.id}`}>
            <TagLabel data={item!} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-11 gap-14 2xl:gap-8">
        <div className="relative col-span-5 xl:col-span-5 mb-6 md:mb-8 lg:mb-0">
          <div className="max-w-[650px] sticky top-[200px] overflow-hidden lg:mx-0 mx-auto">
            {renderGallery()}
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col col-span-6 xl:col-span-6 xl:ps-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block">
              <h2 className="text-skin-base text-lg md:text-xl font-medium transition-colors duration-300 mb-2">
                {name}
              </h2>
            </div>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <div className="flex items-end justify-between">
              <VariationPrice
                salePrice={salePrice!}
                comparePrice={comparePrice!}
                selectedVariationOption={selectedVariationOption}
                isVariableType={isVariableType}
                useAppSelector={useAppSelector}
                useAppDispatch={useAppDispatch}
              />
              {productSku && (
                <div className="text-gray-600 uppercase flex flex-col items-end">
                  {isSoldOut ? (
                    <div className="text-gray-800 text-xs font-medium">
                      out of stock
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-gray-800">
                      In stock
                    </div>
                  )}
                  {`SKU#: ${productSku}`}
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
                    setSelectedVariations
                  }}
                />
              )
            })}
          </div>

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
                <Badge
                  backgroundColor="bg-gray-200"
                  textColor="!text-red-600"
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
                {productQuantity === 0
                  ? t('text-sold-out')
                  : t('text-add-to-cart')}
              </Button>
              <Button className="border rounded-sm h-[50px] !px-3 border-black flex flex-0 items-center justify-center m-1">
                <HeartEmpty className="text-black" width={25} height={25} />
              </Button>
            </div>
          </div>
          {/* Tags */}
          {renderTags()}
          {/* Description */}
          <ProductDescription description={description!} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
