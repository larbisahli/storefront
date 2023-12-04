import { ProductService } from '@gRPC/services'

const productService = new ProductService()

export const fetchStorePopularProducts = async (
  alias: string,
  storeLanguageId: number,
  storeId?: string
) => {
  const { products: popularProducts = [], error: popularProductError } =
    await productService.getPopular(alias, storeLanguageId, storeId)
  if (popularProductError) throw { popularProductError }
  return popularProducts
}

export const fetchStoreProduct = async (
  slug: string,
  alias: string,
  storeLanguageId: number,
  storeId?: string
) => {
  const { product, error: productError } = await productService.getStoreProduct(
    slug,
    alias,
    storeLanguageId,
    storeId
  )
  if (productError) throw { productError }
  return product
}

export const fetchStoreCategoryProducts = async (
  slug: string,
  currentPage: number,
  alias: string,
  storeLanguageId: number,
  storeId?: string
) => {
  const { products, error: categoryProductsError } =
    await productService.getStoreCategoryProducts(
      slug,
      currentPage,
      alias,
      storeLanguageId,
      storeId
    )
  if (categoryProductsError) throw { categoryProductsError }
  return products
}
