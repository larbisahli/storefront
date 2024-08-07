import { setConfig, setLanguage } from '@dropgala/store'
import { ConfigType, LanguageType } from '@dropgala/types/config.type'
import { XSRFHandler } from '@middleware/utils'
import { GetServerSidePropsContext } from 'next'
import { apiURL } from '@dropgala/utils/utils'
import configCacheStore from '@lib/cache/config.store'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import languageCacheStore from '@lib/cache/language.store'

export const fetchStoreConfig = async (
  context: GetServerSidePropsContext,
  alias: string
) => {
  let configObject = { config: {} }
  configObject = await configCacheStore.getConfig(alias)

  if (isEmpty(configObject?.config)) {
    const response = await fetch(`${apiURL}/resources/config`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alias })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Config Error >>', error)
      throw { message: error.message }
    }
    configObject = await response.json()
  }

  const { csrfToken = null, csrfError = null } = await XSRFHandler(context)

  return setConfig({
    storeConfig: {
      csrf: { csrfToken, csrfError },
      ...configObject?.config
    } as unknown as ConfigType
  })
}

export const fetchStoreLanguage = async (languageId: number, alias: string) => {
  let language = {}
  language = await languageCacheStore.getLanguage(languageId, alias)

  if (isEmpty(language)) {
    const response = await fetch(`${apiURL}/resources/language`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ languageId, alias })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Language Error >>', error)
      throw { message: error.message }
    }
    const languageResponse = await response.json()
    language = languageResponse?.language
  }

  return language as LanguageType
}
