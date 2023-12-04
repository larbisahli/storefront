import { promisify } from 'util'
import {
  RPCStoreFrontPort,
  ProductServiceRoutes,
  createInsecure
} from '../client'

export default class ProductService extends ProductServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getPopular(
    alias: string,
    storeLanguageId: number,
    storeId?: string
  ) {
    const popularProducts = promisify(this.getPopularProducts).bind(this)
    return await popularProducts({ alias, storeLanguageId, storeId })
      .then((data) => ({ products: data?.products ?? [], error: null }))
      .catch((error) => ({ error, products: null }))
  }

  public async getStoreCategoryProducts(
    urlKey: string,
    page: number,
    alias: string,
    storeLanguageId: number,
    storeId?: string
  ) {
    const categoryProducts = promisify(this.getCategoryProducts).bind(this)
    return await categoryProducts({
      urlKey,
      page,
      alias,
      storeLanguageId,
      storeId
    })
      .then((data) => ({ products: data?.products, error: null }))
      .catch((error) => ({ error, products: null }))
  }

  public async getStoreProduct(
    slug: string,
    alias: string,
    storeLanguageId: number,
    storeId?: string
  ) {
    const product = promisify(this.getProduct).bind(this)
    return await product({ slug, alias, storeLanguageId, storeId })
      .then((data) => ({ product: data?.product, error: null }))
      .catch((error) => ({ error, product: null }))
  }
}
