import { isEmpty } from '@dropgala/utils/lodashFunctions'
import CartSchema from './models/cart'
import cartPackage from './packages/cart.package'
import { CartType } from '@dropgala/types'

export class CartCacheStore {
  constructor() {}

  public getClientCart = async (cuid: string) => {
    try {
      const resource = await CartSchema.findOne({
        key: { $eq: cuid }
      })

      if (isEmpty(resource && resource.data)) {
        return {} as CartType
      }

      /**
       * Convert the data from Buffer to object
       */
      const cart = await cartPackage.decode(resource?.data!)
      return cart as CartType
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getClientCart >>', { error })
      throw error
    }
  }
}

const cartCacheStore = new CartCacheStore()

export default cartCacheStore
