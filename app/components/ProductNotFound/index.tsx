import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ProductNotFound = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.PRODUCT_NOT_FOUND, props)

export default ProductNotFound
