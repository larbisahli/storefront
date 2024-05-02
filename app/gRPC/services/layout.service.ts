import { promisify } from 'util'
import {
  LayoutServiceRoutes,
  RPCStoreFrontPort,
  createInsecure
} from '../client'

export default class LayoutCallService extends LayoutServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getLayout(
    alias: string,
    storeLanguageId: number,
    page: string,
    storeId?: string
  ) {
    const cmsPage = promisify(this.getPageLayout).bind(this)
    return await cmsPage({ alias, storeLanguageId, suid: storeId, page })
      .then((data) => ({ layout: data?.layout, error: null }))
      .catch((error) => ({ error, layout: null }))
  }
}
