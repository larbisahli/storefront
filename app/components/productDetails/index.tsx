import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const ProductDetails = (props: any) =>
  componentFactory(null, ModuleNames.PRODUCT_DETAILS, props)

export default ProductDetails
