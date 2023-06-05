import { selectConfig } from '@dropgala/store'
import { ComponentNames, ProductCardLayout } from '@dropgala/types/enums.type'
import type { ProductRef, ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

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

  return renderRemoteComponent(theme, ComponentNames.PRODUCT_CARD, {
    product,
    className,
    layout
  })
}

export default ProductCard
