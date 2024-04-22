import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ProductCard = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.PRODUCT_CARD, props)

export default ProductCard
