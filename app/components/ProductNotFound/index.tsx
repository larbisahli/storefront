import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ProductNotFound = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.PRODUCT_NOT_FOUND, props)

export default ProductNotFound
