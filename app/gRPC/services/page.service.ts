import { promisify } from 'util'
import { PageServiceRoutes, RPCStoreFrontPort, createInsecure } from '../client'

export default class PageService extends PageServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStorePage(
    alias: string,
    storeLanguageId: number,
    slug: string,
    storeId?: string
  ) {
    const page = promisify(this.getPage).bind(this)
    return await page({ alias, storeLanguageId, slug, storeId })
      .then((data) => ({ page: data?.page, error: null }))
      .catch((error) => ({ error, page: null }))
  }
}
