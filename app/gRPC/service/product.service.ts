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
    const jwtToken = alias
    const getPopularProducts = promisify(this.getPopularProducts).bind(this)
    return await getPopularProducts({ jwtToken })
      .then((data) => ({ products: data?.products ?? [], error: null }))
      .catch((error) => ({ error, products: null }))
  }
}
