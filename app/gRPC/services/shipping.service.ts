import { promisify } from 'util'
import {
  RPCStoreFrontPort,
  createInsecure,
  ShippingServiceRoutes
} from '../client'

export default class ShippingService extends ShippingServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStoreShippings(alias: string, storeId?: string) {
    const homePageCategories = promisify(this.getAvailableShippings).bind(this)
    return await homePageCategories({ alias, storeId })
      .then((data) => ({ shippings: data?.shippings ?? [], error: null }))
      .catch((error) => ({ error, shippings: [] }))
  }
}
