import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const ProductNotFound = (props: any) =>
  componentFactory(null, ModuleNames.PRODUCT_NOT_FOUND, { ...props })

export default ProductNotFound
