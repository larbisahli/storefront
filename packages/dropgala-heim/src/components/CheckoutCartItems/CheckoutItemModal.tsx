import {
  StoreProps,
  removeItem,
  selectCart,
  setOrderQuantity,
  setOrderVariationOption
} from '@dropgala/store'
import { ProductTypes } from '@dropgala/types'
import {
  AttributeType,
  AttributeValueType
} from '@dropgala/types/attribute.type'
import {
  CartItemType,
  ProductType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import CloseIcon from '../../assets/icons/close'
import cn from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { Dispatch, Fragment, memo, useMemo, useState } from 'react'
import Button from '../ui/Button'
import dynamic from 'next/dynamic'
import { selectedVariationOptionFun } from '@dropgala/utils/utils'
import Image from '../common/Image'

const ProductAttributes = dynamic(
  () => import('../ProductDetails/ProductAttributes'),
  {
    ssr: false
  }
)
const VariationPrice = dynamic(
  () => import('../ProductDetails/VariationPrice'),
  { ssr: false }
)

interface Props extends StoreProps {
  item: CartItemType
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
}

const CheckoutItemModal: React.FC<Props> = ({
  useAppSelector,
  useAppDispatch,
  item,
  isOpen,
  setIsOpen
}) => {
  const { t } = useTranslation('common')

  const dispatch = useAppDispatch()

  const { items } = useAppSelector(selectCart)

  const {
    id,
    key,
    name,
    thumbnail,
    type,
    quantity,
    salePrice,
    comparePrice,
    variations,
    orderVariationOption,
    variationOptions
  } = item

  function closeModal() {
    setIsOpen(false)
  }

  const [selectedVariations, setSelectedVariations] = useState<
    { attribute: AttributeType; value: AttributeValueType }[]
  >([])

  const isVariableType = type?.id === ProductTypes.Variable

  const selectedVariationOption = useMemo(() => {
    return selectedVariationOptionFun({
      selectedVariations,
      variationOptions
    }) as VariationOptionsType
  }, [selectedVariations, variationOptions])

  const UpdateVariationOption = () => {
    const _items = items?.filter((item: ProductType) => item.id === id)
    const variationOptionExist = _items?.find((item) => {
      return (
        !!item?.orderVariationOption?.id &&
        !!selectedVariationOption?.id &&
        item?.orderVariationOption.id === selectedVariationOption?.id
      )
    })

    if (isEmpty(variationOptionExist)) {
      dispatch(
        setOrderVariationOption({
          key: key!,
          orderVariationOption: selectedVariationOption
        })
      )
      if (item.orderQuantity! > selectedVariationOption.quantity) {
        dispatch(
          setOrderQuantity({
            key,
            type,
            orderQuantity: selectedVariationOption.quantity
          })
        )
      }
    } else {
      const key = variationOptionExist.key
      if (item.key! === key) {
        setIsOpen(false)
        return
      }
      // Increment the selected optionVariationOption product holder
      dispatch(
        setOrderQuantity({
          key,
          type,
          orderQuantity: item.orderQuantity
        })
      )
      // Remove current product
      dispatch(removeItem({ key: item.key! }))
    }
    setIsOpen(false)
  }

  const productQuantity =
    (isVariableType ? selectedVariationOption?.quantity : quantity) ?? 0

  const { image, placeholder } = !isEmpty(orderVariationOption?.thumbnail)
    ? orderVariationOption?.thumbnail[0]
    : !isEmpty(thumbnail)
    ? thumbnail![0]
    : { image: '', placeholder: '' }

  if (!isOpen) {
    return null
  }

  return (
    <div className="z-50">
      <div className="fixed inset-0 overlay" onClick={closeModal}></div>
      <div
        className="z-50 fixed w-full xl:w-[55%] md:w-[80%] overflow-y-auto
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex items-center justify-center p-2 text-center">
          <div
            className="w-full relative transform overflow-hidden rounded-sm
                          bg-white p-4 text-left align-middle shadow-xl transition-all"
          >
            <div
              onClick={closeModal}
              role="button"
              className="absolute top-0 right-0 m-2"
            >
              <CloseIcon width="10px" height="10px" />
            </div>
            <div className="flex flex-wrap item-center justify-center w-full">
              <div className="w-auto flex rounded-sm mt-3 mb-3">
                <Image
                  src={image}
                  customPlaceholder={placeholder}
                  width={350}
                  height={350}
                  className="rounded-sm object-cover"
                />
              </div>
              <div className="flex-1 mb-3 mt-3 mx-3">
                <div className="pb-3 lg:pb-5">
                  <div className="md:mb-2.5 block">
                    <h2 className="text-skin-base text-lg md:text-xl font-medium transition-colors duration-300 mb-2">
                      {name}
                    </h2>
                  </div>
                  <div className="split-line-thin"></div>
                  <VariationPrice
                    isVariableType={isVariableType}
                    salePrice={salePrice!}
                    comparePrice={comparePrice!}
                    selectedVariationOption={selectedVariationOption}
                    useAppSelector={useAppSelector}
                    useAppDispatch={useAppDispatch}
                  />
                </div>
                <div className="split-line-thin"></div>
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
                        defaultVariationOption={orderVariationOption}
                      />
                    )
                  })}
                </div>
                <div className="text-xs text-skin-red mb-1">
                  {productQuantity === 0 && <span>out of stock</span>}
                  {productQuantity > 0 && productQuantity <= 5 && (
                    <span>
                      {t('text-only') +
                        ' ' +
                        productQuantity +
                        ' ' +
                        t('text-left')}
                    </span>
                  )}
                </div>
                <Button
                  disabled={productQuantity === 0}
                  onClick={UpdateVariationOption}
                  className={cn(
                    '!w-full text-white bg-gray-900 !font-semibold text-lg !rounded-[2px]',
                    {
                      'opacity-50': productQuantity === 0
                    }
                  )}
                >
                  {productQuantity === 0 ? 'sold out' : 'update'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutItemModal)
