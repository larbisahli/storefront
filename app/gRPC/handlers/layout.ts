import { setStoreLayout } from '@dropgala/store'
import { StoreLayoutType } from '@dropgala/types'
import { serializeNestedBuffers } from '@dropgala/utils/utils'
import { LayoutCallService } from '@gRPC/services'

export const fetchPageLayout = async ({
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
}) => {
  const storeConfig = new LayoutCallService()
  const { layout, error: layoutError } = await storeConfig.getLayout({
    alias,
    templateId,
    storeLanguageId,
    isCustom,
    page,
    storeId
  })
  if (layoutError) throw { layoutError }
  if (!layout) throw { message: 'Returned value from RPC is undefined' }
  console.log(JSON.stringify(layout, null, 2))
  return setStoreLayout({
    layout: serializeNestedBuffers(layout)
  } as unknown as { layout: StoreLayoutType })
}
