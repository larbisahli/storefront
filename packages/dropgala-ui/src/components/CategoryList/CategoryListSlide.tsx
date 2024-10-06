import cn from 'clsx'
import React, { memo } from 'react'

import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import { Pagination } from 'swiper/modules'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { getComponentFromChildren } from '@dropgala/utils/helpers'
import { ModuleGroup } from '@dropgala/types'
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { Autoplay } from 'swiper/modules'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const Link = dynamic(() => import('../common/Link'), {
  loading: () => <></>,
  ssr: false
})

const breakpoints = {
  400: {
    width: 400,
    slidesPerView: 1
  },
  450: {
    width: 500,
    slidesPerView: 2
  },
  640: {
    width: 640,
    slidesPerView: 3
  },
  768: {
    width: 768,
    slidesPerView: 3
  },
  1024: {
    width: 1024,
    slidesPerView: 4
  },
  1100: {
    width: 1100,
    slidesPerView: 5
  },
  1200: {
    width: 1200,
    slidesPerView: 6
  }
}

const CategoryListSlide: React.FC<StoreProps> = ({
  useAppSelector,
  children,
  data,
  styles,
  ...props
}) => {
  const {
    contentId,
    header,
    collection,
    category,
    buttonLabel,
    sliderConfiguration
  } = data

  const { header: headerStyle } = styles

  const { loop, langDirection, delaySpeed, animationSpeed, draggable } =
    sliderConfiguration ?? {}

  const headerClassName = `header-${props.componentId}`

  const renderButton = () => {
    const Button = getComponentFromChildren(children, ModuleGroup.BUTTON)
    if (!Button) return null
    return React.cloneElement(Button, {
      label: buttonLabel,
      size: 'small'
    })
  }

  const renderContentNotFound = () => {
    const ContentNotFound = getComponentFromChildren(
      children,
      ModuleGroup.CONTENT_NOT_FOUND
    )
    if (!ContentNotFound) return null
    return ContentNotFound
  }

  const renderCategoryListItem = (item: any, key: number) => {
    const CategoryListItem = getComponentFromChildren(
      children,
      ModuleGroup.CATEGORY_LIST_ITEM
    )
    if (!CategoryListItem) return null
    return React.cloneElement(CategoryListItem, {
      key,
      isSlide: true,
      ...item
    })
  }

  const renderCollectionSlide = () => {
    if (isEmpty(collection)) {
      return <div>{renderContentNotFound()}</div>
    }
    return (
      <div className="mt-8">
        <SwiperComponent
          dir={langDirection?.value?.toLocaleLowerCase()}
          pagination={{
            dynamicBullets: true
          }}
          breakpoints={breakpoints}
          items={collection}
          loop={loop}
          speed={animationSpeed.value ?? 500}
          autoplay={{
            delay: delaySpeed.value ?? 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          scrollbar={{ draggable }}
          modules={[Pagination, Autoplay]}
          className="h-full"
          centeredSlides
        >
          {(item: any, idx: number) => {
            return renderCategoryListItem(item, idx)
          }}
        </SwiperComponent>
      </div>
    )
  }

  return (
    <section
      id={props.componentId}
      className="relative group max-w-default mx-auto scroll-mt-160px px-2"
    >
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      <_JSXStyle id={contentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
          `}</_JSXStyle>
      {header && (
        <div className="mb-4 flex justify-between items-center w-full">
          <h3 className={cn('flex-1 mobile:!text-lg', headerClassName)}>
            {header}
          </h3>
          {category?.urlKey && buttonLabel && (
            <Link href={`category/${category?.urlKey}`}>{renderButton()}</Link>
          )}
        </div>
      )}
      <div className="w-full">{renderCollectionSlide()}</div>
    </section>
  )
}

export default memo(CategoryListSlide)
