import type { CategoryType } from '@dropgala/types/category.type'
import cn from 'clsx'
import React, { memo } from 'react'

import CategoryCard from './CategoryCard'
import MobileCategoryCard from './MobileCategoryCard'
import { StoreProps, selectConfig, selectMenu } from '@dropgala/store'

interface Props {
  useAppSelector: StoreProps['useAppSelector']
  categories: CategoryType[]
  className?: string
}

const HomePageCategories: React.FC<Props> = ({ useAppSelector }) => {
  const { device } = useAppSelector(selectConfig)
  const { homePageCategories: categories } = useAppSelector(selectMenu)
  const renderCategoryCard = (category: CategoryType) => {
    if (device.isMobile) {
      return <MobileCategoryCard key={category.id} category={category} />
    }
    return <CategoryCard key={category.id} category={category} />
  }
  return (
    <section className={cn('max-w-screen-xl xxl:max-w-[1300px] mx-auto mt-8')}>
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
    </section>
  )
}

export default memo(HomePageCategories)
