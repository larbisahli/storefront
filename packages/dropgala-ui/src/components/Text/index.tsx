import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'

interface Props extends StoreProps {}

const Text: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { contentId, header, description } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const { header: headerStyle, description: descriptionStyle } =
    resolvePath<StoreLayoutComponentStylesType>(props, 'styles', {})

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`

  return (
    <section
      id={props.componentId}
      className={cn(
        'relative group my-8 scroll-mt-160px',
        'max-w-default mx-auto',
        'flex justify-center items-center flex-col px-2'
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
      <_JSXStyle id={contentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
          .${descriptionClassName} {
            ${handleTypographyStyle(descriptionStyle)}
          }
          `}</_JSXStyle>
      <div className="max-w-[900px] max-auto">
        {header && (
          <div className="mb-4 text-3xl">
            <h2 className={headerClassName}>{header}</h2>
          </div>
        )}
        <div className="break-words text-center md:text-lg">
          <p className={descriptionClassName}>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default Text
