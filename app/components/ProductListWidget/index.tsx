import React from 'react'
import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ProductListWidget: React.FC<Props> = (props) => {
  return componentFactory(
    props?.moduleName,
    ModuleGroup.PRODUCT_LIST_WIDGET,
    props
  )
}

export default ProductListWidget
