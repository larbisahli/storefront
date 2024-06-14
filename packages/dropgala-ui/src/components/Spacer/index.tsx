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
    <section className={cn('relative group max-w-full spacer')}>
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
