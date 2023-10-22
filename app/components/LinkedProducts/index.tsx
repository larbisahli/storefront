import ProductCard from '@components/productCard'
import { selectConfig } from '@dropgala/store'
import { ComponentNames, ProductCardLayout } from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import type { ProductRef, ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
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
const LinkedProducts = ({ title, products = [] }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  if (isEmpty(products)) {
    return null
  }
  return componentFactory(
    theme,
    ComponentNames.LINKED_PRODUCTS,
    {
      title,
      products
    },
    (props: ProductCardProps) => <ProductCard {...props} />
  )
}

export default LinkedProducts
