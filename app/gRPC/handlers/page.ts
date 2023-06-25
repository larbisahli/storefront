import { PageType } from '@dropgala/types/page.type'
import { PageService } from '@gRPC/services'

export const fetchStorePage = async (alias: string, slug: string) => {
  const storeConfig = new PageService()

  const { page, error: configError } = await storeConfig.getPage(alias, slug)

  if (configError) {
    throw { configError }
  }

  return page as unknown as PageType
}
