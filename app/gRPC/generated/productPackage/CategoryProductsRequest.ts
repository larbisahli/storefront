// Original file: app/proto/product.proto

export interface CategoryProductsRequest {
  alias?: string
  urlKey?: string
  page?: number
}

export interface CategoryProductsRequest__Output {
  alias: string
  urlKey: string
  page: number
}
