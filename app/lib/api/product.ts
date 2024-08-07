import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL } from '@dropgala/utils/utils'
import productCacheStore from '@lib/cache/product.store'
import productsCacheStore from '@lib/cache/products.store'

export const fetchStoreCategoryProducts = async ({
  slug,
  alias,
  page,
  languageId
}: {
  slug: string
  alias: string
  page: number
  languageId: number
}) => {
  let productsObject = { products: [] } as { products: ProductType[] }
  productsObject = await productsCacheStore.getProducts({
    languageId,
    slug,
    alias,
    page
  })

  if (isEmpty(productsObject?.products)) {
    const response = await fetch(`${apiURL}/resources/categoryProducts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug,
        alias,
        page,
        languageId
      })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Category Products Error >>', error)
      throw { message: error.message }
    }
    productsObject = await response.json()
  }

  return productsObject?.products
}

export const fetchStoreProduct = async ({
  slug,
  alias,
  languageId
}: {
  slug: string
  alias: string
  languageId: number
}) => {
  let product: ProductType
  product = await productCacheStore.getProductBySlug({
    languageId,
    slug,
    alias
  })

  if (isEmpty(product)) {
    const response = await fetch(`${apiURL}/resources/product`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug,
        alias,
        languageId
      })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Product Error >>', error)
      throw { message: error.message }
    }
    product = await response.json()
    console.log('===?======>', { product })
  }

  return product
}
