import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ProductDetails = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.PRODUCT_DETAILS, props)

export default ProductDetails
