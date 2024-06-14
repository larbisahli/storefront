import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'

interface Props extends StoreProps {}

const Text: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { header, description } = resolvePath<StoreLayoutComponentContentType>(
    props,
    'data',
    {}
  )
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )
  return (
    <section
      className={cn(
        'relative group my-8',
        'max-w-[933px] mx-auto',
        'flex justify-center items-center flex-col px-2'
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
        <p>{description}</p>
      </div>
    </section>
  )
}

export default Text
