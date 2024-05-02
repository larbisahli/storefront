import { promisify } from 'util'
import {
  ConfigServiceRoutes,
  RPCStoreFrontPort,
  createInsecure
} from '../client'

export default class ConfigService extends ConfigServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStoreConfig(alias: string, storeId?: string) {
    const config = promisify(this.getConfig).bind(this)
    return await config({ alias, suid: storeId })
      .then((data) => ({ config: data?.config, error: null }))
      .catch((error) => ({ error, config: null }))
  }
}
