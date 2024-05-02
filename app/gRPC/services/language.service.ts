import { promisify } from 'util'
import {
  LanguageServiceRoutes,
  RPCStoreFrontPort,
  createInsecure
} from '../client'

export default class LanguageService extends LanguageServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStoreLanguage(id: number, alias: string, storeId?: string) {
    const language = promisify(this.getLanguage).bind(this)
    return await language({ id, alias, suid: storeId })
      .then((data) => ({ language: data?.language, error: null }))
      .catch((error) => ({ error, language: null }))
  }
}
