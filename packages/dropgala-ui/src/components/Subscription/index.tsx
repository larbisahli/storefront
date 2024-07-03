import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'

interface Props extends StoreProps {}

const Subscription: React.FC<Props> = ({ useAppSelector, ...props }) => {
  console.log({ props })
  return (
    <section
      id={props.componentId}
      className="relative group mt-1 py-3 bg-red-300 scroll-mt-160px"
    >
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
