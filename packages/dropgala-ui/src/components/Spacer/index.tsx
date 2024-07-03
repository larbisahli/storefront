import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import {
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'

interface Props extends StoreProps {}

const Spacer: React.FC<Props> = ({ ...props }) => {
  const { spaceHeight = 50 } = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )
  const spacerClassName = `spacer-${props.componentId}`
  return (
    <section
      id={props.componentId}
      className={cn('relative group max-w-full scroll-mt-160px')}
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
          .${spacerClassName} {
            height: ${spaceHeight}px;
          }
      `}</_JSXStyle>
      <div className={spacerClassName}></div>
    </section>
  )
}

export default Spacer
