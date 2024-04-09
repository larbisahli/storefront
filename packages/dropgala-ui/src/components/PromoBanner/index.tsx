import { Autoplay } from 'swiper/modules'
import { clone } from '@dropgala/utils/lodashFunctions'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import EditIcon from '@dropgala/assets/icons/edit'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const DynamicContent = dynamic(() => import('../common/DynamicContent'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

interface Props extends StoreProps {
  fields: any
}

const PromoBanner = ({ fields }: Props) => {
  const { delaySpeed, direction, items, backgroundColor } = fields?.data ?? {}

  const slides = useMemo(
    () => clone(items)?.sort((a, b) => a.position - b.position),
    [items]
  )

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={cn(
        'relative h-[40px] w-screen text-white text-center font-medium group'
      )}
    >
      <div>
        <div className="z-0 absolute top-0 left-0 right-0 bottom-0 border-[3px] border-[#0042ff] hidden group-hover:block"></div>
        <button className="z-[999] absolute px-2 py-1 items-center left-0 bg-[#0042ff] hidden hover:bg-[#2b64ff] group-hover:flex">
          <EditIcon />
          <span className="pl-1 text-sm">Edit promo banner</span>
        </button>
      </div>
      <SwiperComponent
        dir={direction?.toLocaleLowerCase()}
        loop
        centeredSlides
        autoplay={{
          delay: Number(delaySpeed),
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
        className="h-full"
        items={slides}
      >
        {(item: { content: string }) => (
          <div className="flex justify-center items-center w-screen h-[40px]">
            <DynamicContent
              tagName="span"
              innerHtml={item?.content}
              attrs={{
                className:
                  'line-clamp-2 px-1 text-sm lg:text-base leading-[14px]'
              }}
            />
          </div>
        )}
      </SwiperComponent>
    </div>
  )
}

export default PromoBanner
