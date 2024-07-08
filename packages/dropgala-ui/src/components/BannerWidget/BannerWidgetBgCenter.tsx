import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import { getComponentFromChildren, resolvePath } from '@dropgala/utils/helpers'
import Link from 'next/link'
import {
  ModuleGroup,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import LibraryPlaceholder from '../common/libraryPlaceholder'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import _JSXStyle from 'styled-jsx/style'

interface Props extends StoreProps {}

const BannerWidgetBgCenter: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { header, description, buttonLink, buttonLabel } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const renderButton = () => {
    const Button = getComponentFromChildren(children, ModuleGroup.BUTTON)
    if (!Button) return null
    return React.cloneElement(Button, { label: buttonLabel })
  }

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`

  return (
    <figcaption
      id={props.componentId}
      className={cn(
        'relative group/library scroll-mt-320px bg-white',
        'flex flex-col justify-center items-center p-5 rounded-md max-w-[600px] opacity-95 border'
      )}
    >
      <_JSXStyle id={props.componentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(styles.header)}
          }
          .${descriptionClassName} {
            ${handleTypographyStyle(styles.description)}
          }
      `}</_JSXStyle>
      <LibraryPlaceholder {...props} isEdit />
      <div className="flex flex-col justify-center items-center">
        <h2 className={cn('mb-5', headerClassName)}>{header}</h2>
        <p className={cn('text-center mb-8', descriptionClassName)}>
          {description}
        </p>
        {buttonLabel && <Link href={buttonLink ?? '/'}>{renderButton()}</Link>}
      </div>
    </figcaption>
  )
}

export default BannerWidgetBgCenter
