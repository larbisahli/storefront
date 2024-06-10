import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { resolvePath } from '@dropgala/utils/helpers'
import { SectionSize } from '@dropgala/types'
import cn from 'clsx'
import DynamicContent from '../common/DynamicContent'
import _JSXStyle from 'styled-jsx/style'

interface Props extends StoreProps {
  data: any
}

const Html: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const data = resolvePath(props, 'data', {})
  const { sectionSize, css } = resolvePath(props, 'styles', {})

  return (
    <section
      className={cn(
        'relative group',
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
      <DynamicContent tagName="div" innerHtml={data?.innerHtml} />
    </section>
  )
}

export default Html
