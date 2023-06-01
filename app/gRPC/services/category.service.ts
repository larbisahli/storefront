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

  public async getMenu(alias: string) {
    const getStoreMenu = promisify(this.getStoreMenu).bind(this)
    return await getStoreMenu({ alias })
      .then((data) => ({ menu: data?.menu ?? [], error: null }))
      .catch((error) => ({ error, menu: null }))
  }

  public async getCategory(alias: string, urlKey: string) {
    const getStoreCategory = promisify(this.getStoreCategory).bind(this)
    return await getStoreCategory({ alias, urlKey })
      .then((data) => ({ category: data?.category, error: null }))
      .catch((error) => ({ error, category: null }))
  }
}
