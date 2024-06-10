import cn from 'clsx'
import React from 'react'

import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { getThumbnail } from '@dropgala/utils/helpers'

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const categories = [
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pp.png',
        placeholder: '/assets/images/pp.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pb.png',
        placeholder: '/assets/images/pb.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pp.png',
        placeholder: '/assets/images/pp.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pb.png',
        placeholder: '/assets/images/pb.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pp.png',
        placeholder: '/assets/images/pp.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pb.png',
        placeholder: '/assets/images/pb.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pp.png',
        placeholder: '/assets/images/pp.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pb.png',
        placeholder: '/assets/images/pb.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pp.png',
        placeholder: '/assets/images/pp.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pb.png',
        placeholder: '/assets/images/pb.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pp.png',
        placeholder: '/assets/images/pp.png'
      }
    ]
  },
  {
    title: 'Category A',
    subTitle: 'Category A',
    link: '',
    thumbnail: [
      {
        image: '/assets/images/pb.png',
        placeholder: '/assets/images/pb.png'
      }
    ]
  }
]

const CategoryList: React.FC<StoreProps> = ({ useAppSelector, ...props }) => {
  const header = 'Featured Category'
  const bgColor = '#bfe6ff'
  return (
    <section className="relative group max-w-default mx-auto my-12">
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      {header && (
        <div className="mb-5 mx-2">
          <h2 className="uppercase tracking-wide text-lg font-medium">
            {header}
          </h2>
        </div>
      )}
      <div className="w-full">
        <div
          className={cn(
            'grid w-fit mx-auto gap-5 mobile:grid-cols-2 ',
            'tablet:grid-cols-3 grid-cols-6 laptop:grid-cols-4 desktop:w-full'
          )}
        >
          {categories?.map((category, idx) => {
            const thumbnail = getThumbnail(category.thumbnail)
            return (
              <div
                key={idx}
                className={cn(
                  'w-[140px] lg:w-[150px] h-[150px] m-4 mb-6 cursor-pointer',
                  'relative flex justify-between items-center'
                )}
              >
                <Link
                  href={{
                    pathname: '/category/[slug]',
                    query: { slug: category.link }
                  }}
                  className=""
                >
                  <figure className="flex flex-col justify-end items-center rounded-t-full">
                    <div
                      style={{ background: bgColor }}
                      className="rounded-full"
                    >
                      <Image
                        src={thumbnail?.image}
                        customPlaceholder={thumbnail?.placeholder}
                        isCustomUrl
                        width={150}
                        height={150}
                        objectFit="cover"
                        className="bg-transparent rounded-full"
                      />
                    </div>
                    <figcaption>
                      <span className="uppercase tracking-wide line-clamp-1 text-xs mt-3 font-semibold">
                        {category.title}
                      </span>
                    </figcaption>
                    <figcaption>
                      <span className="tracking-wide text-xs line-clamp-1">
                        {category.subTitle}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryList
