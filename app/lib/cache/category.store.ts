import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import CategorySchema from './models/category'

export class CategoryCacheStore {
  constructor() {}

  private getId = ({ storeId, key }: { storeId: string; key: string }) => {
    return crypto.createHash('sha256').update(`${storeId}:${key}`).digest('hex')
  }

  public getResource = async ({
    storeId,
    key
  }: {
    storeId: string
    key: string
  }) => {
    try {
      const resource = await CategorySchema.findOne({
        key: { $eq: this.getId({ storeId, key }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await this.categoryPackage.decodeMenu(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('category-getResource >>', { error })
      throw error
    }
  }
}
