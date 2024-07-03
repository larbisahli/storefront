import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import cn from 'clsx'
import DynamicContent from '../common/DynamicContent'
import _JSXStyle from 'styled-jsx/style'

interface Props extends StoreProps {}

const Html: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const { sectionSize, css } = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  return (
    <section
      id={props.componentId}
      className={cn(
        'relative group scroll-mt-160px',
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
      <_JSXStyle id={data.contentId}>{css}</_JSXStyle>
      <DynamicContent tagName="div" innerHtml={data?.html} />
    </section>
  )
}

export default Html
