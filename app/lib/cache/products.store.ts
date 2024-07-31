import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import ProductsSchema from './models/products'

export class ProductsCacheStore {
  constructor() {}

  private getId = ({
    storeId,
    key,
    page = null
  }: {
    storeId: string
    key: string
    page?: number | null
  }) => {
    if (page) {
      return crypto
        .createHash('sha256')
        .update(`${storeId}:${key}:${page}`)
        .digest('hex')
    } else {
      return crypto
        .createHash('sha256')
        .update(`${storeId}:${key}`)
        .digest('hex')
    }
  }

  public getProducts = async ({
    storeId,
    key,
    page = null
  }: {
    storeId: string
    key: string
    page?: number | null
  }) => {
    try {
      const resource = await ProductsSchema.findOne({
        key: { $eq: this.getId({ storeId, key, page }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await this.productPackage.decodeProducts(resource?.data!))
        ?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getProducts >>', { error })
      throw error
    }
  }
}
