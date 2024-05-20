import React from 'react'
import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ProductList: React.FC<Props> = (props) => {
  return componentFactory(props?.moduleName, ModuleGroup.PRODUCT_LIST, props)
}

export default ProductList
