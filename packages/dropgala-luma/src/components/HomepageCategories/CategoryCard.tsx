import { CategoryType } from '@dropgala/types/category.type'
import React from 'react'
import Image from '../common/Image'
import Link from '../ui/Link'

interface Props {
  category: CategoryType
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
      className="max-h-[300px] w-full hover:shadow-categoryCard overflow-hidden"
    >
      <figure className="relative leading-[0] transition duration-200 ease-in-out transform">
        <Image
          src={image}
          customPlaceholder={placeholder}
          alt={name}
          width={500}
          height={300}
          className="object-contain rounded-sm"
        />
        <figcaption className="absolute bottom-6 w-full">
          <span
            className="bg-black bg-opacity-60 py-2 px-1 uppercase text-white text-sm w-[90%]
          mx-auto lg:text-center whitespace-break-spaces line-clamp-1 relative
          rounded-sm font-manrope font-semibold"
          >
            {name}
          </span>
        </figcaption>
      </figure>
    </Link>
  )
}

export default CategoryCard
