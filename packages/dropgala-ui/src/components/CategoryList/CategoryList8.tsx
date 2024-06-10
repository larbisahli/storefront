import cn from 'clsx'
import React from 'react'

import { StoreProps } from '@dropgala/store'
import { selectCategory } from '@dropgala/store/Category'

const CategoryList8: React.FC<StoreProps> = ({ useAppSelector }) => {
  const { children } = useAppSelector(selectCategory)
  return (
    <div className={cn('max-w-default mx-auto')}>
      <div className="flex items-center lg:flex-row flex-col flex-wrap">
        CategoryList8
      </div>
    </div>
  )
}

export default CategoryList8
