import ProductCard from '@components/productCard'
import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  title: string
  products:
    | ProductType['upsellProducts']
    | ProductType['relatedProducts']
    | ProductType['crossSellProducts']
}

const LinkedProducts = ({ title, products = [] }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  if (isEmpty(products)) {
    return null
  }

  return renderRemoteComponent(
    theme,
    ComponentNames.LINKED_PRODUCTS,
    {
      title,
      products
    },
    (props) => <ProductCard {...props} />
  )
}

export default LinkedProducts
