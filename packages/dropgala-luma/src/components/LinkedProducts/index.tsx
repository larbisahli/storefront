import { ProductRef, ProductType } from '@dropgala/types/product.type'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Slider = dynamic(() => import('../common/Slider'))

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

interface Props {
  title: string
  products: ProductRef[]
  children: ({
    product,
    className
  }: {
    product: ProductType | ProductRef
    className?: string
  }) => JSX.Element
}
const RelatedProducts = ({ title, products = [], children }: Props) => {
  const [actualSlide, setActualSlide] = useState(0)

  const updateSlide = ({ currentSlide }: any) => {
    setActualSlide(currentSlide)
  }

  return (
    <div>
      <div className="text-xl font-semibold mb-8">{title}</div>
      {
        // @ts-ignore
        <Slider
          infiniteLoop
          numOfSlides={5}
          sanitize={false}
          doAfterSlide={updateSlide}
          slide={actualSlide}
        >
          {products?.map((product) => children({ product, className: 'mx-4' }))}
        </Slider>
      }
    </div>
  )
}

export default RelatedProducts
