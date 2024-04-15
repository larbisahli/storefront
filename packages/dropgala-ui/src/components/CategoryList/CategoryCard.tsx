import {
  CategoryRefLevel2,
  CategoryRefLevel3,
  CategoryType
} from '@dropgala/types/category.type'
import React, { memo } from 'react'
import Image from '../common/Image'
import Link from '../common/Link'

interface Props {
  category: CategoryType | CategoryRefLevel2 | CategoryRefLevel3
}

const CategoryCard: React.FC<Props> = ({ category }: Props) => {
  const { name, thumbnail, urlKey } = category
  const { image, placeholder } = thumbnail[0] ?? {}
  return (
    <Link
      href={{
        pathname: '/category/[slug]',
        query: { slug: urlKey }
      }}
      className="outline outline-1 outline-gray-300 [last-child]:bg-purple-800 w-full lg:w-[200px] h-[160px] lg:h-[220px] p-3 hover:shadow-categoryCard"
    >
      <figure className="flex flex-row-reverse lg:flex-col items-center justify-between w-full h-full">
        <div className="w-[150px] h-[150px]">
          <Image
            src={image}
            customPlaceholder={placeholder}
            alt={name}
            width={150}
            height={150}
            className="object-cover rounded-sm"
          />
        </div>
        <figcaption className="pt-3 px-1 self-end lg:self-center">
          <span className="font-semibold text-sm lg:text-center whitespace-break-spaces line-clamp-2 relative">
            {name}
          </span>
        </figcaption>
      </figure>
    </Link>
  )
}

export default memo(CategoryCard)
