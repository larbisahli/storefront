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
    const getPopularProducts = promisify(this.getPopularProducts).bind(this)
    return await getPopularProducts({ alias })
      .then((data) => ({ products: data?.products ?? [], error: null }))
      .catch((error) => ({ error, products: null }))
  }

  public async getStoreProduct(alias: string, slug: string) {
    const getProduct = promisify(this.getProduct).bind(this)
    return await getProduct({ alias, slug })
      .then((data) => ({ product: data?.product, error: null }))
      .catch((error) => ({ error, product: null }))
  }
}
