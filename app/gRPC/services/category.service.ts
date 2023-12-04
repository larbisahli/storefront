import { promisify } from 'util'
import {
  RPCStoreFrontPort,
  CategoryServiceRoutes,
  createInsecure
} from '../client'

export default class CategoryService extends CategoryServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStoreMenu(
    alias: string,
    storeLanguageId: number,
    storeId?: string
  ) {
    const menu = promisify(this.getMenu).bind(this)
    return await menu({ alias, storeLanguageId, storeId })
      .then((data) => ({ menu: data?.menu ?? [], error: null }))
      .catch((error) => ({ error, menu: null }))
  }

  public async getStoreCategory(
    urlKey: string,
    alias: string,
    storeLanguageId: number,
    storeId?: string
  ) {
    const category = promisify(this.getCategory).bind(this)
    return await category({ urlKey, alias, storeLanguageId, storeId })
      .then((data) => ({ category: data?.category, error: null }))
      .catch((error) => ({ error, category: null }))
  }
}
