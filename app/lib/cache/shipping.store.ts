import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ShippingSchema from './models/shipping'
import crypto from 'crypto'

export class ShippingCacheStore {
  constructor() {}

  private getId = (storeId: string) => {
    return crypto.createHash('sha256').update(storeId).digest('hex')
  }

  public getShippings = async (storeId: string) => {
    try {
      const resource = await ShippingSchema.findOne({
        key: { $eq: this.getId(storeId) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await this.shippingPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getShippings >>', { error })
      throw error
    }
  }
}
