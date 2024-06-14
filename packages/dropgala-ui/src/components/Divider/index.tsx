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

const Divider: React.FC<Props> = ({ ...props }) => {
  const {
    lineStyle = { value: 'solid' },
    lineThickness = 1,
    lineColor = '#555',
    lineWidth = 60,
    alignment = 'center'
  } = resolvePath<StoreLayoutComponentStylesType>(props, 'styles', {})
  const dividerWrapperClassName = `divider-wrapper-${props.componentId}`
  const dividerClassName = `divider-${props.componentId}`
  return (
    <section className={cn('relative group max-w-full divider')}>
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      <_JSXStyle id={props.componentId}>{`
          .${dividerWrapperClassName} {
            display: flex;
            justify-content: ${alignment};
          }
          .${dividerClassName} {
            border-width: ${lineThickness}px;
            width: ${lineWidth}%;
            border-style: ${lineStyle?.value};
            border-color: ${lineColor};
          }
      `}</_JSXStyle>
      <div className={dividerWrapperClassName}>
        <div className={dividerClassName}></div>
      </div>
    </section>
  )
}

export default Divider
