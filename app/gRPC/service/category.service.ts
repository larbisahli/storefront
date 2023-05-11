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
}
