import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'

interface Props extends StoreProps {
  data: any
}

const Text: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { header, text } = props.data ?? {}
  return (
    <section
      className={cn(
        'relative group my-8',
        'max-w-[933px] mx-auto',
        'flex justify-center items-center flex-col px-2'
        // bg-yellow-500 lg:bg-black md:bg-orange-500
      )}
    >
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      {header && (
        <div className="mb-4 text-3xl">
          <h2>{header}</h2>
        </div>
      )}
      <div className="break-words text-center md:text-lg">
        <p>{text}</p>
      </div>
    </section>
  )
}

export default Text
