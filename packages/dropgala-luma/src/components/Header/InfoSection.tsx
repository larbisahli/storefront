import { ConfigType } from '@dropgala/types/config.type'
import CurrencySwitcherList from './CurrencySwitcherList'
import { memo } from 'react'

interface Props {
  storeConfig: ConfigType
  handleDefaultCurrency: (
    defaultCurrency: ConfigType['defaultCurrency']
  ) => void
}

const InfoSection = ({ storeConfig, handleDefaultCurrency }: Props) => {
  const { storeEmail, storeNumber } = storeConfig
  return (
    <div className="hidden lg:flex items-center justify-between pt-2 pb-1 px-2">
      <div className="flex items-center text-xs text-gray-900 flex-1">
        {storeNumber && (
          <div className="pr-5 flex items-center">
            <div className="pr-3">Telephone:</div>
            <span>{storeNumber}</span>
          </div>
        )}
        {storeEmail && (
          <div className="flex items-center">
            <div className="pr-3">Mail:</div>
            <span>{storeEmail}</span>
          </div>
        )}
      </div>
      <div className="flex-0">
        <CurrencySwitcherList
          storeConfig={storeConfig}
          handleDefaultCurrency={handleDefaultCurrency}
        />
      </div>
    </div>
  )
}

export default memo(InfoSection)
