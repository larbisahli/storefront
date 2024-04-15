import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ProductDetails = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.PRODUCT_DETAILS, props)

export default ProductDetails
