import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { CheckoutPackage } from './packages/checkout.package'
import CheckoutSchema from './models/checkout'

export class CheckoutCacheStore {
  constructor() {}

  public getCheckout = async ({ cuid }: { cuid: string }) => {
    try {
      const resource = await CheckoutSchema.findOne({
        key: { $eq: cuid }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return await this.checkoutPackage.decode(resource?.data!)
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getCheckout >>', { error })
      throw error
    }
  }
}
