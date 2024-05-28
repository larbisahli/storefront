import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'

interface Props extends StoreProps {
  data: any
  styles: any
}

const Spacer: React.FC<Props> = ({ ...props }) => {
  const { spaceHeight = 50 } = resolvePath(props, 'styles', {})
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
