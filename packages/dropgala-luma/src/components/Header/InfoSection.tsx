import { ConfigType } from '@dropgala/types/config.type'

interface Props {
  storeConfig: ConfigType
}

const InfoSection = ({ storeConfig }: Props) => {
  const { storeEmail, storeNumber, currency: { code } = {} } = storeConfig
  return (
    <div className="hidden lg:flex items-center justify-between pt-2 pb-1 px-2">
      <div className="flex items-center text-xs text-gray-900">
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
      {code && <div className="text-sm text-gray-900">{code}</div>}
    </div>
  )
}

export default InfoSection
