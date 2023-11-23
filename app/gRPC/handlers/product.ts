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

export const fetchStoreProduct = async (alias: string, slug: string) => {
  const { product, error: productError } = await productService.getStoreProduct(
    alias,
    slug
  )
  if (productError) throw { productError }
  return product
}

export const fetchStoreCategoryProducts = async (
  alias: string,
  slug: string,
  currentPage: number
) => {
  const { products, error: categoryProductsError } =
    await productService.getStoreCategoryProducts(alias, slug, currentPage)
  if (categoryProductsError) throw { categoryProductsError }
  return products
}
