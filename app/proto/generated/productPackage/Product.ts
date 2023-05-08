// Original file: app/proto/product.proto

import type {
  ProductType as _productPackage_ProductType,
  ProductType__Output as _productPackage_ProductType__Output
} from '../productPackage/ProductType'
import type {
  Image as _photoPackage_Image,
  Image__Output as _photoPackage_Image__Output
} from '../photoPackage/Image'

export interface Product {
  id?: number
  name?: string
  sku?: string
  slug?: string
  type?: _productPackage_ProductType | null
  description?: string
  thumbnail?: _photoPackage_Image[]
  inStock?: boolean
  salePrice?: number
  comparePrice?: number
  quantity?: number
  disableOutOfStock?: boolean
}

export interface Product__Output {
  id: number
  name: string
  sku: string
  slug: string
  type: _productPackage_ProductType__Output | null
  description: string
  thumbnail: _photoPackage_Image__Output[]
  inStock: boolean
  salePrice: number
  comparePrice: number
  quantity: number
  disableOutOfStock: boolean
}
