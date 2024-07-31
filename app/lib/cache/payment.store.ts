import { isEmpty } from '@dropgala/utils/lodashFunctions'
import PaymentSchema from './models/payment'
import crypto from 'crypto'
import { PaymentPackage } from './packages/payment.package'

export class PaymentCacheStore {
  constructor() {}

  private getId = (storeId: string) => {
    return crypto.createHash('sha256').update(storeId).digest('hex')
  }

  public getPayments = async (storeId: string) => {
    try {
      const resource = await PaymentSchema.findOne({
        key: { $eq: this.getId(storeId) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await this.paymentPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getPayments >>', { error })
      throw error
    }
  }
}
