import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'

interface Props extends StoreProps {
  data: any
}

const Subscription: React.FC<Props> = ({ useAppSelector, ...props }) => {
  console.log({ props })
  return (
    <section className="relative group mt-1 py-3 bg-red-300 ">
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      Subscription
    </section>
  )
}

export default Subscription
