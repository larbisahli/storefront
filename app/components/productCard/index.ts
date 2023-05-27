import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { ProductRef, ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  product: ProductType | ProductRef
  className?: string
}

const ProductCard = ({ product, className }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.PRODUCT_CARD, {
    product,
    className
  })
}

export default ProductCard
