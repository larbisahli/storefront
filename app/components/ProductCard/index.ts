import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ProductCard = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.PRODUCT_CARD, props)

export default ProductCard
