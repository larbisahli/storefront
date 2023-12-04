import { ProductRef, ProductType } from '@dropgala/types/product.type'
import { useMemo, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

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

  const { width = 800 } = useWindowSize()

  const numOfSlides = useMemo(() => {
    if (width <= 500) {
      return 1
    } else if (width > 500 && width <= 650) {
      return 2
    } else if (width > 650 && width <= 800) {
      return 3
    } else if (width > 800 && width <= 1200) {
      return 4
    } else {
      return 5
    }
  }, [width])

  return (
    <div>
      <div className="text-xl font-semibold mb-8">{title}</div>
      {
        // @ts-ignore
        // <Slider
        //   infiniteLoop
        //   numOfSlides={numOfSlides}
        //   sanitize={!(numOfSlides > 1)}
        //   doAfterSlide={updateSlide}
        //   slide={actualSlide}
        // >
        //   {products?.map((product) => children({ product, className: 'mx-4' }))}
        // </Slider>
      }
    </div>
  )
}

export default RelatedProducts
