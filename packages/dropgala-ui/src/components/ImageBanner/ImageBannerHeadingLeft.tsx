import React, { useEffect } from 'react'
import { StoreProps, addFontFamily, selectConfig } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useWindowSize from 'hooks/useWindowSize'
import cn from 'clsx'
import {
  Alignment,
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType,
  TextSize
} from '@dropgala/types'
import {
  getComponentFromChildren,
  getThumbnail,
  resolvePath
} from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import Button from '../ui/Button'
import {
  handleBorderStyle,
  handleTypographyStyle
} from '@dropgala/utils/styles'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const ImageBannerHeadingLeft: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { device } = useAppSelector(selectConfig)
  // const { width } = useWindowSize()

  const { header, description, thumbnail, buttonLabel, buttonLink } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const {
    header: headerStyle,
    description: descriptionStyle,
    sectionSize,
    objectFit,
    imageBorder
  } = resolvePath<StoreLayoutComponentStylesType>(props, 'styles', {})

  const { image, placeholder, width, height } = getThumbnail(thumbnail)

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`
  const imageBorderWrapperClassName = `image-wrapper-${props.componentId}`
  const imageBorderClassName = `image-${props.componentId}`

  const renderButton = () => {
    const Button = getComponentFromChildren(children, ModuleGroup.BUTTON)
    if (!Button) return null
    return React.cloneElement(Button, { label: buttonLabel })
  }

  return (
    <section
      className={cn(
        'relative group mb-8',
        sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
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
              ${handleTypographyStyle(headerStyle)}
            }
            .${descriptionClassName} {
              ${handleTypographyStyle(descriptionStyle)}
            }
            .${imageBorderWrapperClassName} {
              ${handleBorderStyle(imageBorder)}
            }
            .${imageBorderClassName} {
              border-radius: ${imageBorder?.borderRadius}px;
            }
      `}</_JSXStyle>
      <div className={cn('lg:p-8 p-4 !px-0')}>
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
            <h3 className={cn('mb-5', headerClassName)}>{header}</h3>
            <p className={cn('mb-8', descriptionClassName, '!lg:bg-red-300')}>
              {description}
            </p>
            <div className={cn('flex lg:justify-start justify-center')}>
              <Link href={buttonLink}>{renderButton()}</Link>
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

export default ImageBannerHeadingLeft
