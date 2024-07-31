import { configPackage } from './packages'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import ConfigSchema from './models/config'
import dbConnect from '@lib/dbConnect'

export class ConfigCacheStore {
  private getId = (alias: string) => {
    return crypto.createHash('sha256').update(alias).digest('hex')
  }

  public getConfig = async (alias: string) => {
    try {
      await dbConnect()
      const resource = await ConfigSchema.findOne({
        key: { $eq: this.getId(alias) }
      })

      console.log('getConfig >>>', {
        hash: this.getId(alias),
        ConfigSchema,
        resource
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await configPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getConfig >>', { error })
      throw error
    }
  }
}

const configCacheStore = new ConfigCacheStore()

export default configCacheStore
