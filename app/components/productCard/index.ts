import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ProductCard = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.PRODUCT_CARD, { ...props })

export default ProductCard
