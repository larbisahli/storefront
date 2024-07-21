import { promisify } from 'util'
import {
  RPCStoreFrontPort,
  createInsecure,
  PaymentServiceRoutes
} from '../client'

export default class PaymentService extends PaymentServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStorePayments(alias: string, storeId?: string) {
    const availablePayments = promisify(this.getAvailablePayments).bind(this)
    return await availablePayments({ alias, suid: storeId })
      .then((data) => ({ payments: data?.payments ?? [], error: null }))
      .catch((error) => ({ error, payments: [] }))
  }
}
