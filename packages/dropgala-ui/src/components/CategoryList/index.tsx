import cn from 'clsx'
import React from 'react'

import CategoryCard from './CategoryCard'
import { StoreProps } from '@dropgala/store'
import { selectCategory } from '@dropgala/store/Category'

const CategoryList: React.FC<StoreProps> = ({ useAppSelector }) => {
  const { children } = useAppSelector(selectCategory)
  return (
    <div className={cn('max-w-screen-xl xxl:max-w-screen-xxl mx-auto')}>
      <div className="flex items-center lg:flex-row flex-col flex-wrap">
        {children?.map((category) => {
          return <CategoryCard key={category.id} category={category} />
        })}
      </div>
    </div>
  )
}

export default CategoryList
