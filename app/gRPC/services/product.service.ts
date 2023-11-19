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

  public async getPopular(alias: string) {
    const popularProducts = promisify(this.getPopularProducts).bind(this)
    return await popularProducts({ alias })
      .then((data) => ({ products: data?.products ?? [], error: null }))
      .catch((error) => ({ error, products: null }))
  }

  public async getStoreCategoryProducts(
    alias: string,
    urlKey: string,
    page: number
  ) {
    const categoryProducts = promisify(this.getCategoryProducts).bind(this)
    return await categoryProducts({ alias, urlKey, page })
      .then((data) => ({ products: data?.products, error: null }))
      .catch((error) => ({ error, products: null }))
  }

  public async getStoreProduct(alias: string, slug: string) {
    const product = promisify(this.getProduct).bind(this)
    return await product({ alias, slug })
      .then((data) => ({ product: data?.product, error: null }))
      .catch((error) => ({ error, product: null }))
  }
}
