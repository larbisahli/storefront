import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  product: ProductType
}

const ProductDetails = ({ product }: Props) => {
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']
  return componentFactory(ComponentNames.PRODUCT_DETAILS, {
    product,
    data
  })
}

export default ProductDetails
