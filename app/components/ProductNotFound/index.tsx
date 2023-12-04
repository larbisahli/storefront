import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const ProductNotFound = () => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.PRODUCT_NOT_FOUND, {})
}

export default ProductNotFound
