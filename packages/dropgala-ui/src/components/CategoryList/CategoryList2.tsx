import cn from 'clsx'
import React from 'react'

import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Pagination } from 'swiper/modules'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { getThumbnail } from '@dropgala/utils/helpers'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

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

const breakpoints = {
  350: {
    width: 350,
    slidesPerView: 2
  },
  400: {
    width: 400,
    slidesPerView: 2
  },
  640: {
    width: 640,
    slidesPerView: 3
  },
  768: {
    width: 768,
    slidesPerView: 4
  },
  1024: {
    width: 1024,
    slidesPerView: 5
  },
  1200: {
    width: 1200,
    slidesPerView: 6
  },
  1300: {
    width: 1300,
    slidesPerView: 7
  }
}

const CategoryList2: React.FC<StoreProps> = ({ useAppSelector, ...props }) => {
  const header = 'Featured Category 2'
  const bgColor = '#cbc3e0'
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
        <SwiperComponent
          loop={true}
          speed={500}
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          breakpoints={breakpoints}
          // effect="fade"
          className="h-full"
          items={categories}
          // grabCursor
        >
          {(category: any) => {
            const thumbnail = getThumbnail(category.thumbnail)
            return (
              <div
                className={cn(
                  'w-[150px] h-[150px] py-9 cursor-pointer',
                  'relative flex justify-between items-center'
                )}
              >
                <Link href={category.link} className="">
                  <div className="flex flex-col justify-end items-center rounded-t-full">
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
                    <span className="uppercase tracking-wide text-xs mt-3 font-semibold line-clamp-1">
                      {category.title}
                    </span>
                    <span className="tracking-wide text-xs line-clamp-1">
                      {category.subTitle}
                    </span>
                  </div>
                </Link>
              </div>
            )
          }}
        </SwiperComponent>
      </div>
    </section>
  )
}

export default CategoryList2
