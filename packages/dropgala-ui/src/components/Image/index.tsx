import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { SectionSize } from '@dropgala/types'
import { getThumbnail } from '@dropgala/utils/helpers'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {
  data: any
}

const Image: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const {
    thumbnail,
    sectionSize,
    borderRadius = { value: 'xs' },
    objectFit = { value: 'fill' }
  } = props?.data ?? {}
  const { image, placeholder, height, width } = getThumbnail(thumbnail)
  const radius =
    sectionSize === SectionSize.AUTO
      ? `rounded-${borderRadius?.value}`
      : `rounded-none`
  return (
    <section
      className={cn(
        'relative group mb-8',
        sectionSize === SectionSize.AUTO &&
          'max-w-screen-xl xxl:max-w-[1300px] mx-auto',
        sectionSize === SectionSize.FULL && 'max-w-full',
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
      <div className={cn(radius)}>
        <NextImage
          src={image}
          customPlaceholder={placeholder}
          // layout='fill'
          width={1300}
          height={height ?? 500}
          objectFit={objectFit?.value}
          className={cn('bg-skin-thumbnail', radius)}
        />
      </div>
    </section>
  )
}

export default Image
