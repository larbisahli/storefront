import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ProductDetails = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.PRODUCT_DETAILS, props)

export default ProductDetails
