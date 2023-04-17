// import SectionHeader from '@components/common/section-header';
// import ProductCardLoader from '@components/ui/loaders/product-card-loader';
// import ProductCard from '@containers/product/product-card';
import type { ProductType } from '@dropgala/types/product.type'
import getDirection from '@dropgala/utils/get-direction'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'

import useWindowSize from '../../hooks/useWindowSize'
// import Alert from '@components/ui/alert';
// import { Product } from '@framework/types';
// import Carousel from './Carousel'
// import { SwiperSlide } from '../Slider/Slider'

interface ProductsCarouselProps {
  sectionHeading: string
  categorySlug?: string
  className?: string
  headingPosition?: 'center' | 'left'
  sectionSubHeading?: string
  products?: ProductType[]
  loading: boolean
  error?: string
  limit?: number
  uniqueKey?: string
  carouselBreakpoint?: {} | any
}

const breakpoints = {
  '1921': {
    slidesPerView: 6
  },
  '1780': {
    slidesPerView: 6
  },
  '1536': {
    slidesPerView: 5
  },
  '1280': {
    slidesPerView: 4
  },
  '1120': {
    slidesPerView: 4
  },
  '800': {
    slidesPerView: 3
  },
  '640': {
    slidesPerView: 2
  },
  '360': {
    slidesPerView: 2
  },
  '0': {
    slidesPerView: 1
  }
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition,
  className = 'mb-8 lg:mb-10 xl:mb-12',
  products,
  loading,
  error,
  limit,
  uniqueKey,
  carouselBreakpoint
}) => {
  const { width } = useWindowSize()
  const { locale } = useRouter()
  const dir = getDirection(locale)
  return (
    <div
      className={cn(
        'max-w-[1920px] overflow-hidden 4xl:overflow-visible px-4 md:px-6 lg:px-8 2xl:ps-10 2xl:pe-0 4xl:pe-10 mx-auto relative',
        className
      )}
    >
      <div className="mb-5 md:mb-6">
        {/* <SectionHeader
          headingPosition={headingPosition}
          sectionSubHeading={sectionSubHeading}
          sectionHeading={sectionHeading}
          className="mb-0"
        /> */}
      </div>
    </div>
  )
}

export default ProductsCarousel
