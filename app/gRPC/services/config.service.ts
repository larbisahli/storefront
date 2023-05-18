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

  public async getConfig(alias: string) {
    const getStoreMenu = promisify(this.getStoreConfig).bind(this)
    return await getStoreMenu({ alias })
      .then((data) => ({ config: data?.config, error: null }))
      .catch((error) => ({ error, config: null }))
  }
}
