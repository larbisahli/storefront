import { setStoreLayout } from '@dropgala/store'
import { StoreLayoutType } from '@dropgala/types'
import { serializeNestedBuffers } from '@dropgala/utils/utils'
import { LayoutCallService } from '@gRPC/services'

export const fetchPageLayout = async (
  alias: string,
  storeLanguageId: number,
  page: string,
  storeId?: string
) => {
  const storeConfig = new LayoutCallService()
  const { layout, error: layoutError } = await storeConfig.getLayout(
    alias,
    storeLanguageId,
    page,
    storeId
  )
  if (layoutError) throw { layoutError }
  if (!layout) throw { message: 'Returned value from RPC is undefined' }
  console.log(JSON.stringify(layout, null, 2))
  return setStoreLayout({
    layout: serializeNestedBuffers(layout)
  } as unknown as { layout: StoreLayoutType })
}
