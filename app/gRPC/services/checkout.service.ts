import { promisify } from 'util'
import {
  RPCStoreFrontPort,
  CheckoutServiceRoutes,
  createInsecure
} from '../client'

export default class CheckoutService extends CheckoutServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStoreCart({
    alias,
    storeLanguageId,
    cuid,
    storeId
  }: {
    alias: string
    storeLanguageId: number
    cuid: string
    storeId?: string
  }) {
    const clientCart = promisify(this.getClientCart).bind(this)
    return await clientCart({ alias, storeLanguageId, cuid, storeId })
      .then((data) => {
        return { cart: data?.cart, error: null }
      })
      .catch((error) => ({ error, cart: null }))
  }

  public async getStoreCheckout(cuid: string) {
    const clientCheckout = promisify(this.getClientCheckout).bind(this)
    return await clientCheckout({ cuid })
      .then((data) => {
        return { checkout: data?.checkout, error: null }
      })
      .catch((error) => ({ error, checkout: null }))
  }
}
