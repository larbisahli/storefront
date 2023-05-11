import { TagType } from '@dropgala/types/tag.type'
import cn from 'clsx'
import React from 'react'

interface Props {
  data: TagType
  className?: string
}

const TagLabel: React.FC<Props> = ({ className, data }) => {
  const { name } = data

  return (
    <div
      className={cn(
        'font-medium text-13px md:text-sm rounded hover:bg-skin-button-secondary block border border-sink-base px-2 py-1 transition',
        className
      )}
      role="button"
    >
      {name}
    </div>
  )
}

export default TagLabel
