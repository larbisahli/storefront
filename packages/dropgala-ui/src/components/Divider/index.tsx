import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'

interface Props extends StoreProps {
  data: any
}

const Spacer: React.FC<Props> = ({ ...props }) => {
  const data = props.data ?? {}
  return (
    <section className={cn('relative group')}>
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
    </section>
  )
}

export default Spacer
