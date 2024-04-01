import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const ProductCard = (props: any) =>
  componentFactory(ComponentNames.PRODUCT_CARD, { ...props })

export default ProductCard
