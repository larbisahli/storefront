import React, { useEffect } from 'react'
import { StoreProps, addFontFamily, selectConfig } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useWindowSize from 'hooks/useWindowSize'
import cn from 'clsx'
import { Alignment, SectionSize, TextSize } from '@dropgala/types'
import { getThumbnail, resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import Button from '../ui/Button'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {
  data: any
}

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const ImageBannerHeadingCenter: React.FC<Props> = ({
  useAppSelector,
  ...props
}) => {
  const { device } = useAppSelector(selectConfig)
  // const { width } = useWindowSize()

  const { header, description, thumbnail, buttonLabel } = resolvePath(
    props,
    'data',
    {}
  )
  const {
    header: headerStyle,
    description: descriptionStyle,
    sectionSize,
    objectFit,
    imageBorder
  } = resolvePath(props, 'styles', {})

  const { image, placeholder, width, height } = getThumbnail(thumbnail)

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`
  const imageBorderWrapperClassName = `image-wrapper-${props.componentId}`
  const imageBorderClassName = `image-${props.componentId}`

  const handleBorderStyle = (border: string) => {
    if (border === 'all') {
      return `border: ${imageBorder?.borderWidth}px ${imageBorder?.borderStyle?.value} ${imageBorder?.borderColor};`
    }
    if (border === 'top') {
      return `border-top: ${imageBorder?.borderWidth}px ${imageBorder?.borderStyle?.value} ${imageBorder?.borderColor};`
    }
    if (border === 'left') {
      return `border-left: ${imageBorder?.borderWidth}px ${imageBorder?.borderStyle?.value} ${imageBorder?.borderColor};`
    }
    if (border === 'right') {
      return `border-right: ${imageBorder?.borderWidth}px ${imageBorder?.borderStyle?.value} ${imageBorder?.borderColor};`
    }
    if (border === 'bottom') {
      return `border-bottom: ${imageBorder?.borderWidth}px ${imageBorder?.borderStyle?.value} ${imageBorder?.borderColor};`
    }
  }

  return (
    <section
      className={cn(
        'relative group mb-8',
        sectionSize === SectionSize.AUTO &&
          'max-w-screen-xl xxl:max-w-[1300px] mx-auto',
        sectionSize === SectionSize.FULL && 'max-w-full'
      )}
    >
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      <_JSXStyle id={props.componentId}>{`
          .${headerClassName} {
            font-family: var(${headerStyle?.fontFamily?.value});
            font-size: ${headerStyle?.fontSize}px;
            font-style: ${headerStyle?.fontStyle};
            font-weight: ${headerStyle?.fontWeight?.value};
            color: ${headerStyle?.color};
            letter-spacing: ${headerStyle?.letterSpacing}px;
            line-height: ${headerStyle?.lineHeight}px;
            text-align: ${headerStyle?.textAlign};
            text-decoration: ${headerStyle?.textDecoration};
            text-transform: ${headerStyle?.textTransform};
          }
          .${descriptionClassName} {
            font-family: var(${descriptionStyle?.fontFamily?.value});
            font-size: ${descriptionStyle?.fontSize}px;
            font-style: ${descriptionStyle?.fontStyle};
            font-weight: ${descriptionStyle?.fontWeight?.value};
            color: ${descriptionStyle?.color};
            letter-spacing: ${descriptionStyle?.letterSpacing}px;
            line-height: ${descriptionStyle?.lineHeight}px;
            text-align: ${descriptionStyle?.textAlign};
            text-decoration: ${descriptionStyle?.textDecoration};
            text-transform: ${descriptionStyle?.textTransform};
          }
          .${imageBorderWrapperClassName} {
            border-radius: ${imageBorder?.borderRadius}px;
            ${handleBorderStyle(imageBorder?.border)}
          }
          .${imageBorderClassName} {
            border-radius: ${imageBorder?.borderRadius}px;
          }
      `}</_JSXStyle>
      <div className={cn('lg:p-8 p-4 !px-0')}>
        <h3 className={cn('mb-16', headerClassName)}>{header}</h3>
        <div
          className={cn(
            'flex justify-center items-center',
            'lg:flex-row flex-col'
          )}
        >
          <div
            className={cn(
              'lg:w-1/2 w-full lg:pr-12 mb-5 lg:mb-0 lg:block flex flex-col justify-center'
            )}
          >
            <p className={cn('mb-8', descriptionClassName, '!lg:bg-red-300')}>
              {description}
            </p>
            <div className={cn('flex lg:justify-start justify-center')}>
              <Button>{buttonLabel}</Button>
            </div>
          </div>
          <div
            className={cn('lg:w-1/2 w-full flex justify-end sm:justify-center')}
          >
            <div
              className={cn('w-[600px] h-fit flex-end', imageBorderClassName)}
            >
              <NextImage
                src={image}
                customPlaceholder={placeholder}
                width={600}
                height={350}
                objectFit={objectFit?.value}
                className={cn('bg-skin-thumbnail', imageBorderClassName)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageBannerHeadingCenter
