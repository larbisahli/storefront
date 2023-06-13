import { setConfig } from '@dropgala/store'
import { ConfigType } from '@dropgala/types/config.type'
import { ConfigService } from '@gRPC/services'

export const fetchStoreConfig = async (alias: string) => {
  const storeConfig = new ConfigService()

  const { config, error: configError } = await storeConfig.getConfig(alias)

  if (configError) {
    throw { configError }
  }

  return setConfig({
    storeConfig: { ...config, theme: '@dropgala/luma' } as unknown as ConfigType
  })
}
