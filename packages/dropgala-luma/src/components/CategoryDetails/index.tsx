import React from 'react'
import { CategoryType } from '@dropgala/types/category.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Image from '../common/Image'

interface Props {
  category: CategoryType
}

const CategoryDetails: React.FC<Props> = ({ category }) => {
  const renderCategoryName = () => {
    return (
      <div
        className="text-lg border-t-2 border-b-2 mb-4
         border-black w-full font-medium py-1 lg:text-3xl lg:w-fit lg:text-left text-center"
      >
        {category?.name}
      </div>
    )
  }

  const renderCategoryDescription = () => {
    return (
      <div className="text-gray-900 text-xs lg:text-sm lg:text-left text-center">
        {category?.description}
      </div>
    )
  }

  const renderCategoryImage = () => {
    if (isEmpty(category?.thumbnail)) {
      return null
    }

    const { image, placeholder } = category?.thumbnail[0]

    return (
      <div className="flex w-fit">
        <Image
          src={image}
          customPlaceholder={placeholder}
          objectFit="contain"
          width={250}
          height={250}
        />
      </div>
    )
  }

  return (
    <article className="bg-gray-100 rounded-sm flex items-center justify-between p-5 lg:flex-row flex-col">
      <div className="flex-1 lg:p-8">
        {renderCategoryName()}
        {renderCategoryDescription()}
      </div>
      <div className="flex-1 lg:p-2 pt-10 flex justify-end">
        {renderCategoryImage()}
      </div>
    </article>
  )
}

export default CategoryDetails
