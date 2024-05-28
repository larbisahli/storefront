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
    const availableShippings = promisify(this.getAvailableShippings).bind(this)
    return await availableShippings({ alias, suid: storeId })
      .then((data) => ({ shippings: data?.shippings ?? [], error: null }))
      .catch((error) => ({ error, shippings: [] }))
  }
}
