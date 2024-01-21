import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props extends StoreProps {}

const ConfirmationSummary = ({ useAppSelector, useAppDispatch }: Props) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')

  return (
    <div className="mt-44 flex items-center justify-center flex-col">
      <div className="text-2xl text-black font-semibold">
        {__('Thank you for your order!')}
      </div>
      <div className="text-sm text-black">
        {__('Thank you for your order! we will call you to confirm you order')}
      </div>
    </div>
  )
}

export default ConfirmationSummary
