import type { CategoryType } from '@dropgala/types/category.type'
import cn from 'clsx'
import React, { memo } from 'react'

import CategoryCard from './CategoryCard'
import MobileCategoryCard from './MobileCategoryCard'
import { StoreProps, selectConfig } from '@dropgala/store'

interface Props {
  useAppSelector: StoreProps['useAppSelector']
  categories: CategoryType[]
  className?: string
}

const HomePageCategories: React.FC<Props> = ({
  useAppSelector,
  categories = [],
  className = ''
}) => {
  const { device } = useAppSelector(selectConfig)

  const renderCategoryCard = (category: CategoryType) => {
    if (device.isMobile) {
      return <MobileCategoryCard key={category.id} category={category} />
    }
    return <CategoryCard key={category.id} category={category} />
  }

  return (
    <div
      className={cn('max-w-screen-xl xxl:max-w-screen-xxl mx-auto', className)}
    >
      <div
        className={cn(
          device.isMobile && 'flex items-center flex-col flex-wrap',
          device.isDesktop && 'grid lg:grid-cols-3 lg:gap-4 grid-cols-2 gap-3'
        )}
      >
        {categories?.map((category) => {
          return renderCategoryCard(category)
        })}
      </div>
    </div>
  )
}

export default memo(HomePageCategories)
