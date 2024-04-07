import ProductCard from '@components/ProductCard'
import { ModuleNames, ProductCardLayout } from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import type { ProductRef, ProductType } from '@dropgala/types/product.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  title: string
  products:
    | ProductType['upsellProducts']
    | ProductType['relatedProducts']
    | ProductType['crossSellProducts']
}
interface ProductCardProps {
  product: ProductType | ProductRef
  className?: string
  layout?: ProductCardLayout
}
const LinkedProducts = (props: any) => {
  if (isEmpty(props?.products)) {
    return null
  }
  return componentFactory(
    null,
    ModuleNames.LINKED_PRODUCTS,
    { ...props },
    (props: ProductCardProps) => <ProductCard {...props} />
  )
}

export default LinkedProducts
