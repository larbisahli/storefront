import React from 'react'
import dynamic from 'next/dynamic'
import { CategoryType } from '@dropgala/types/category.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

const Image = dynamic(() => import('../common/Image'))

interface Props {
  category: CategoryType
}

const CategoryDetails: React.FC<Props> = ({ category }) => {
  const renderCategoryName = () => {
    return (
      <div
        className="text-3xl border-t-2 border-b-2 mb-4
         border-black w-fit font-medium py-1"
      >
        {category?.name}
      </div>
    )
  }

  const renderCategoryDescription = () => {
    return <div className="text-gray-900 text-sm">{category?.description}</div>
  }

  const renderCategoryImage = () => {
    if (isEmpty(category?.thumbnail)) {
      return null
    }

    const { image, placeholder } = category?.thumbnail[0]

    return (
      <div className="flex w-full items-end">
        <Image
          src={image}
          customPlaceholder={placeholder}
          objectFit="contain"
          width={500}
          height={250}
        />
      </div>
    )
  }

  return (
    <article className="bg-gray-100 rounded-sm flex items-center justify-between p-5">
      <div className="flex-1 p-10">
        {renderCategoryName()}
        {renderCategoryDescription()}
      </div>
      <div className="flex-1 p-2">{renderCategoryImage()}</div>
    </article>
  )
}

export default CategoryDetails
