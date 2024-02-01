import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useRouter } from 'next/router'

interface Props extends StoreProps {}

const ConfirmationSummary = ({ useAppSelector, useAppDispatch }: Props) => {
  const { query } = useRouter()
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  const { ref } = query

  return (
    <div className="mt-44 flex items-center justify-center flex-col">
      <div className="text-2xl text-black font-semibold">
        {__('Thank you for your order!')}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm text-black">
          {__(
            'Thank you for your order! we will call you to confirm you order'
          )}
        </div>
        <div className="text-black mt-6 border p-2 border-gray-300 rounded-md shadow-card">
          {__('Your order number: %s', ref)}
        </div>
      </div>
    </div>
  )
}

export default ConfirmationSummary
