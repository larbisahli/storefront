import { setConfig, setLanguage } from '@dropgala/store'
import { ConfigType, LanguageType } from '@dropgala/types/config.type'
import { ConfigService } from '@gRPC/services'
import LanguageService from '@gRPC/services/language.service'

export const fetchStoreConfig = async (alias: string, storeId?: string) => {
  const storeConfig = new ConfigService()
  const { config = null, error: configError } =
    await storeConfig.getStoreConfig(alias, storeId)
  if (configError) throw { configError }
  if (!config) throw { message: 'Returned value from RPC is undefined' }
  return setConfig({
    storeConfig: { theme: '@dropgala/luma', ...config } as unknown as ConfigType
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
  console.log('language :>>>', { language })
  if (languageError) throw { languageError }
  if (!language) throw { message: 'Returned value from RPC is undefined' }
  return setLanguage({
    storeLanguage: language as unknown as LanguageType
  })
}
