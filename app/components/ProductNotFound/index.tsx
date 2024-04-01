import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const ProductNotFound = (props: any) =>
  componentFactory(ComponentNames.PRODUCT_NOT_FOUND, { ...props })

export default ProductNotFound
