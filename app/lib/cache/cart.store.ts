import { isEmpty } from '@dropgala/utils/lodashFunctions'
import CartSchema from './models/cart'
import { CartPackage } from './packages/cart.package'

export class CartCacheStore {
  constructor() {}

  public getClientCart = async ({ cartId }: { cartId: string }) => {
    try {
      const resource = await CartSchema.findOne({
        key: { $eq: cartId }
      }) //.lean()

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      const cart = await this.cartPackage.decode(resource?.data!)
      return { cart }
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getClientCart >>', { error })
      throw error
    }
  }
}
