import React from 'react'
import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ProductListWidget: React.FC<Props> = (props) => {
  return componentFactory(
    props?.componentName,
    ModuleNames.PRODUCT_LIST_WIDGET,
    props
  )
}

export default ProductListWidget
