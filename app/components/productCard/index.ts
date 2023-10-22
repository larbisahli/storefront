import { selectConfig } from '@dropgala/store'
import { ComponentNames, ProductCardLayout } from '@dropgala/types/enums.type'
import type { ProductRef, ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  product: ProductType | ProductRef
  className?: string
  layout?: ProductCardLayout
}

const ProductCard = ({
  product,
  className,
  layout = ProductCardLayout.Grid
}: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.PRODUCT_CARD, {
    product,
    className,
    layout
  })
}

export default ProductCard
