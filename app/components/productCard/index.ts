import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { CartItemType, ProductType } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { renderComponent } from '@lib/packages'
import { addItem } from '@dropgala/store/Cart'

interface Props {
  product: ProductType
}

const ProductCard = ({ product }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  const dispatch = useAppDispatch()

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(addItem(product as CartItemType))
  }

  return renderComponent(theme, ComponentNames.PRODUCT_CARD, {
    product,
    handleAddToCart
  })
}

export default ProductCard
