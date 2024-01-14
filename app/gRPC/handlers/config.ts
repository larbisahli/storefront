import { setConfig, setLanguage } from '@dropgala/store'
import { ConfigType, LanguageType } from '@dropgala/types/config.type'
import { ConfigService, LanguageService } from '@gRPC/services'
import { XSRFHandler } from '@middleware/utils'
import { GetServerSidePropsContext } from 'next'

export const fetchStoreConfig = async (
  context: GetServerSidePropsContext,
  alias: string,
  storeId?: string
) => {
  const storeConfig = new ConfigService()
  const { config = null, error: configError } =
    await storeConfig.getStoreConfig(alias, storeId)
  if (configError) throw { configError }
  if (!config) throw { message: 'Returned value from RPC is undefined' }

  const { csrfToken = null, csrfError = null } = await XSRFHandler(context)

  return setConfig({
    storeConfig: {
      csrf: { csrfToken, csrfError },
      ...config
    } as unknown as ConfigType
  })
}

export const fetchStoreLanguage = async (
  id: number,
  alias: string,
  storeId?: string
) => {
  const storeLanguage = new LanguageService()
  const { language = null, error: languageError } =
    await storeLanguage.getStoreLanguage(id, alias, storeId)
  if (languageError) throw { languageError }
  if (!language) throw { message: 'Returned value from RPC is undefined' }
  return setLanguage({
    storeLanguage: language as unknown as LanguageType
  })
}
