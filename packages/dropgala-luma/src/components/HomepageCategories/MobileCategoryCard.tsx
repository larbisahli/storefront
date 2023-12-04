import { CategoryType } from '@dropgala/types/category.type'
import React from 'react'
import Image from '../common/Image'
import Link from '../ui/Link'

interface Props {
  category: CategoryType
}

const MobileCategoryCard: React.FC<Props> = ({ category }: Props) => {
  const { name, thumbnail, url } = category
  const { image, placeholder } = thumbnail[0] ?? {}
  return (
    <Link
      href={{
        pathname: '/category/[slug]',
        query: { slug: url }
      }}
      className="bg-gray-200 w-full h-[160px] mt-5 p-3 hover:shadow-categoryCard"
    >
      <figure className="flex flex-row-reverse items-center justify-between w-full h-full">
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
        <figcaption className="pt-3 px-1 self-end">
          <span className="font-semibold text-sm whitespace-break-spaces line-clamp-2 relative">
            {name}
          </span>
        </figcaption>
      </figure>
    </Link>
  )
}

export default MobileCategoryCard
