import { promisify } from 'util'
import { PageServiceRoutes, RPCStoreFrontPort, createInsecure } from '../client'

export default class PageService extends PageServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getPage(alias: string, slug: string) {
    const getStorePage = promisify(this.getStorePage).bind(this)
    return await getStorePage({ alias, slug })
      .then((data) => ({ page: data?.page, error: null }))
      .catch((error) => ({ error, page: null }))
  }
}
