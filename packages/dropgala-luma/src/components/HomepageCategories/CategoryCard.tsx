import { CategoryType } from '@dropgala/types/category.type'
import dynamic from 'next/dynamic'
import React from 'react'

const Image = dynamic(() => import('../common/Image'))
const Link = dynamic(() => import('../ui/Link'))

interface Props {
  category: CategoryType
}

const CategoryCard: React.FC<Props> = ({ category }: Props) => {
  console.log({ category })
  const { name, thumbnail, url } = category
  const { image, placeholder } = thumbnail[0] ?? {}
  return (
    <Link
      href={{
        pathname: '/category/[slug]',
        query: { slug: url }
      }}
      className="bg-gray-200 w-full lg:w-[150px] h-[160px] lg:h-[200px] mt-5 lg:mr-5 p-3 hover:shadow-categoryCard"
    >
      <figure className="flex flex-row-reverse lg:flex-col items-center justify-between w-full h-full">
        <div className="w-[120px] h-[120px]">
          <Image
            src={image}
            customPlaceholder={placeholder}
            alt={name}
            width={120}
            height={120}
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

export default CategoryCard
