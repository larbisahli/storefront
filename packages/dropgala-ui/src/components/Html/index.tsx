import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'

interface Props extends StoreProps {
  data: any
}

const Html: React.FC<Props> = ({ useAppSelector, ...props }) => {
  console.log('===================> HTML')
  return (
    <section className="relative group mt-1 py-3 bg-red-300">
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      Html
    </section>
  )
}

export default Html
