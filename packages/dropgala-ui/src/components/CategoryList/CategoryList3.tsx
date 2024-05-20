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
    subTitle: 'Category A Category A Category A',
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
    subTitle: 'Category A Category A Category A',
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

const CategoryList3: React.FC<StoreProps> = ({ useAppSelector, ...props }) => {
  const header = 'Featured Category 3'
  const bgColor = '#cbc3e0'
  return (
    <section className="relative group max-w-screen-xl xxl:max-w-[1300px] mx-auto my-12">
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
            'grid w-fit mx-auto gap-5 grid-cols-2 ',
            'sm:grid-cols-3 lg:grid-cols-6 md:grid-cols-4 lg:w-full'
          )}
        >
          {categories?.map((category, idx) => {
            const thumbnail = getThumbnail(category.thumbnail)
            return (
              <div
                key={idx}
                className={cn(
                  'w-[145px] lg:w-[165px] mx-2 h-fit cursor-pointer',
                  'relative flex justify-between items-center rounded-sm'
                )}
              >
                <Link href={category.link} className="">
                  <div className="flex flex-col justify-end items-center">
                    <div style={{ background: bgColor }} className="rounded-sm">
                      <Image
                        src={thumbnail?.image}
                        customPlaceholder={thumbnail?.placeholder}
                        isCustomUrl
                        width={165}
                        height={200}
                        objectFit="cover"
                        className="bg-transparent rounded-sm"
                      />
                    </div>
                    <span className="uppercase tracking-wide line-clamp-1 text-xs mt-2 font-semibold">
                      {category.title}
                    </span>
                    <span className="tracking-wide text-[10px] leading-3 text-gray-800 text-center line-clamp-2 max-w-[85%]">
                      {category.subTitle}
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryList3
