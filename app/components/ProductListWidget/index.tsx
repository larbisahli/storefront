import React from 'react'
import { StoreProps } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props extends StoreProps {
  componentName: string
  popularProducts: ProductType[]
  children: JSX.Element
}

const ProductListWidget: React.FC<Props> = ({ componentName, ...props }) => {
  return componentFactory(componentName, ModuleNames.PRODUCT_LIST_WIDGET, {
    ...props
  })
}

export default ProductListWidget
