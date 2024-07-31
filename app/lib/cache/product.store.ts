import { ProductPackage } from './packages'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import ProductSchema from './models/product'

export class ProductCacheStore {
  constructor() {}

  private getBySlug = ({
    storeId,
    slug
  }: {
    storeId: string
    slug: string
  }) => {
    return crypto
      .createHash('sha256')
      .update(`${storeId}:${slug}`)
      .digest('hex')
  }

  public getProductById = async (id: number) => {
    try {
      const resource = await ProductSchema.findOne({
        key: { $eq: id }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await this.productPackage.decodeProduct(resource?.data!))
        ?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getProductById >>', { error })
      throw error
    }
  }

  public getProductBySlug = async ({
    storeId,
    slug
  }: {
    storeId: string
    slug: string
  }) => {
    try {
      const resource = await ProductSchema.findOne({
        slug: { $eq: this.getBySlug({ storeId, slug }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await this.productPackage.decodeProduct(resource?.data!))
        ?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getProductBySlug >>', { error })
      throw error
    }
  }
}
