import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import ReactHtmlParser from 'html-react-parser'
import _JSXStyle from 'styled-jsx/style'
import {
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'

interface Props extends StoreProps {}

const EditorialText: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { contentId, content = '' } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )
  const editorialTextClassName = `editorial-text-${props.componentId}`
  return (
    <section
      className={cn(
        'relative group mb-8',
        styles?.sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full',
        'flex justify-center items-center flex-col px-2'
      )}
    >
      <_JSXStyle id={contentId}>{`
          .${editorialTextClassName} {
            font-family: var(${styles?.fontFamily?.value});
          }
          `}</_JSXStyle>
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      <div className={editorialTextClassName}>
        {ReactHtmlParser(content ?? '')}
      </div>
    </section>
  )
}

export default EditorialText
