import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props extends StoreProps {}

const ConfirmationSummary = ({ useAppSelector, useAppDispatch }: Props) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')

  return (
    <div>
      <div className="text-lg text-black font-semibold">
        {__('Thank you for your order!')}
      </div>
      <div className="text-sm text-black">
        {__('Thank you for your order! we will call you to confirm you order')}
      </div>
    </div>
  )
}

export default ConfirmationSummary
