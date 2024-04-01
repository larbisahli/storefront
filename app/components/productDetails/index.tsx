import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const ProductDetails = (props: any) =>
  componentFactory(ComponentNames.PRODUCT_DETAILS, props)

export default ProductDetails
