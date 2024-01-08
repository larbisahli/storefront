import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props {
  useAppSelector: StoreProps['useAppSelector']
}

const ShippingOption = ({ useAppSelector }: Props) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')

  return (
    <div className="bg-gray-100 label-bg w-full sm:rounded relative shadow border border-gray-300">
      <div className="px-3 py-4">
        <div className="font-semibold text-base text-skin-base">
          <span>{__('Shipping')}:</span>
          <span className="mx-1">{'$34.58'}</span>
        </div>
        <div className="text-sm mb-3">
          {__('Carrier method: %s', 'Standard Post')}
        </div>
        <div className="text-sm">
          {__('Ships to %s via %s', 'Morocco', 'Amana Express')}
        </div>
        <div className="text-sm">{__('Estimated days: %s', '1-3 days')}</div>
        <div className="text-sm bg-gray-200 border border-gray-300 px-2 py-1 max-w-fit mt-2 rounded shadow-badge">
          {__('Tracking Available')}
        </div>
      </div>
    </div>
  )
}

export default ShippingOption
