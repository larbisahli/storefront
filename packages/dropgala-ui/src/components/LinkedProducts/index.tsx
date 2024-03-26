import { ProductRef, ProductType } from '@dropgala/types/product.type'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

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
  console.log({ products })
  return (
    <div>
      <div className="text-xl font-semibold mb-8 px-2">{title}</div>
      {
        <Swiper
          loop
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides={true}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 5
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5
            }
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {products?.map((product) => {
            return (
              <SwiperSlide className="my-5">
                {children({ product, className: 'mx-auto' })}
              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </div>
  )
}

export default RelatedProducts
