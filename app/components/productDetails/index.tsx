import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  product: ProductType
}

const ProductDetails = ({ product }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.PRODUCT_DETAILS, {
    product
  })
}

export default ProductDetails
