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

  public async getLayout({
    alias,
    templateId,
    storeLanguageId,
    isCustom,
    page,
    storeId
  }: {
    alias: string
    templateId: string
    storeLanguageId: number
    isCustom: boolean
    page: string
    storeId?: string
  }) {
    const cmsPage = promisify(this.getPageLayout).bind(this)
    return await cmsPage({
      alias,
      templateId,
      storeLanguageId,
      suid: storeId,
      isCustom,
      page
    })
      .then((data) => ({ layout: data?.layout, error: null }))
      .catch((error) => ({ error, layout: null }))
  }
}
