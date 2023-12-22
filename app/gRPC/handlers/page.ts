import { PageType } from '@dropgala/types/page.type'
import { PageService } from '@gRPC/services'

export const fetchStorePage = async (
  alias: string,
  storeLanguageId: number,
  slug: string,
  storeId?: string
) => {
  const pageConfig = new PageService()
  const { page, error: configError } = await pageConfig.getStorePage(
    alias,
    storeLanguageId,
    slug,
    storeId
  )
  if (configError) throw { configError }
  return page as unknown as PageType
}
