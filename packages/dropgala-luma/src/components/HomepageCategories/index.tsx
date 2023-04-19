import type { CategoryType } from '@dropgala/types/category.type'
import cn from 'clsx'
import React from 'react'

import CategoryCard from './CategoryCard'

interface Props {
  categories: CategoryType[]
  className?: string
}

const HomePageCategories: React.FC<Props> = ({
  categories = [],
  className = ''
}) => {
  return (
    <div
      className={cn(
        'max-w-screen-xl xxl:max-w-screen-xxl mx-auto xl:px-0',
        className
      )}
    >
      <div className="flex items-center lg:flex-row flex-col flex-wrap px-5 lg:px-0">
        {categories?.map((category) => {
          return <CategoryCard key={category.id} category={category} />
        })}
      </div>
    </div>
  )
}

export default HomePageCategories
