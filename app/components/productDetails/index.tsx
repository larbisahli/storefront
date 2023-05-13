import { selectConfig, toggleCart } from '@dropgala/store'
import { ComponentNames, ProductTypes } from '@dropgala/types/enums.type'
import { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { renderComponent } from '@lib/packages'
import { addItem, selectCart, setOrderQuantity } from '@dropgala/store/Cart'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useMemo, useState } from 'react'
import {
  AttributeType,
  AttributeValueType
} from '@dropgala/types/attribute.type'
import { selectedVariationOptionFun } from '@dropgala/utils/utils'

interface Props {
  product: ProductType
}

const ProductDetails = ({ product }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  const cart = useAppSelector(selectCart)

  const dispatch = useAppDispatch()

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [selectedVariations, setSelectedVariations] = useState<
    { attribute: AttributeType; value: AttributeValueType }[]
  >([])

  const cartItems = cart.items

  const { id, type, variationOptions } = product

  const isVariableType = type?.id === ProductTypes.Variable

  const selectedVariationOption = useMemo(() => {
    return selectedVariationOptionFun({ selectedVariations, variationOptions })
  }, [selectedVariations, variationOptions])

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

  return renderComponent(theme, ComponentNames.PRODUCT_DETAILS, {
    product,
    addToCart,
    cartItems,
    selectedVariations,
    setSelectedVariations,
    selectedQuantity,
    setSelectedQuantity,
    selectedVariationOption
  })
}

export default ProductDetails
