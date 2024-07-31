import { setStoreLayout } from '@dropgala/store'
import { StoreLayoutType } from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL, serializeNestedBuffers } from '@dropgala/utils/utils'
import layoutCacheStore from '@lib/cache/layout.store'

export const fetchPageLayout = async ({
  alias,
  templateId,
  languageId,
  isCustom,
  page
}: {
  alias: string
  templateId: string
  languageId: number
  isCustom: boolean
  page: string
}) => {
  let layout = {}
  layout = await layoutCacheStore.getPageLayout(
    alias,
    templateId,
    languageId,
    page
  )

  if (isEmpty(layout)) {
    const response = await fetch(`${apiURL}/resources/layout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        alias,
        templateId,
        languageId,
        isCustom,
        page
      })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Language Error >>', error)
      throw { message: error.message }
    }
    layout = await response.json()
  }

  return setStoreLayout({
    layout: serializeNestedBuffers(layout)
  } as unknown as { layout: StoreLayoutType })
}
