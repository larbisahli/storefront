import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'

interface Props extends StoreProps {
  data: any
}

const VideoBanner: React.FC<Props> = ({ useAppSelector, ...props }) => {
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
      VideoBanner
    </section>
  )
}

export default VideoBanner
