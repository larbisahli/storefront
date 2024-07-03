import cn from 'clsx'
import React, { memo } from 'react'

import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import BuilderPlaceholder from '../common/builderPlaceholder'
import {
  getComponentFromChildren,
  getThumbnail,
  resolvePath
} from '@dropgala/utils/helpers'
import {
  ModuleGroup,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import _JSXStyle from 'styled-jsx/style'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const Link = dynamic(() => import('../common/Link'), {
  loading: () => <></>,
  ssr: false
})

const CategoryListSlide: React.FC<StoreProps> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const {
    contentId,
    header,
    collection,
    category,
    buttonLabel,
    categoriesPerView
  } = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const { header: headerStyle } = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const headerClassName = `header-${props.componentId}`
  const gridCol3ClassName = `grid-3-${props.componentId}`
  const gridCol4ClassName = `grid-4-${props.componentId}`
  const gridCol5ClassName = `grid-5-${props.componentId}`
  const gridCol6ClassName = `grid-6-${props.componentId}`

  const renderButton = () => {
    const Button = getComponentFromChildren(children, ModuleGroup.BUTTON)
    if (!Button) return null
    return React.cloneElement(Button, {
      label: buttonLabel,
      size: 'small'
    })
  }

  const renderContentNotFound = () => {
    const ContentNotFound = getComponentFromChildren(
      children,
      ModuleGroup.CONTENT_NOT_FOUND
    )
    if (!ContentNotFound) return null
    return ContentNotFound
  }

  const renderCategoryListItem = (item: any, key: number) => {
    const CategoryListItem = getComponentFromChildren(
      children,
      ModuleGroup.CATEGORY_LIST_ITEM
    )
    if (!CategoryListItem) return null
    return React.cloneElement(CategoryListItem, {
      key,
      itemsPerColumn: Number(categoriesPerView),
      ...item
    })
  }

  const renderCollectionList = () => {
    if (isEmpty(collection)) {
      return <div>{renderContentNotFound()}</div>
    }
    return (
      <div
        className={cn(
          'grid mx-auto desktop:gap-5 gap-3 mt-8 w-full',
          Number(categoriesPerView) === 3 && gridCol3ClassName,
          Number(categoriesPerView) === 4 && gridCol4ClassName,
          Number(categoriesPerView) === 5 && gridCol5ClassName,
          Number(categoriesPerView) === 6 && gridCol6ClassName
        )}
      >
        {collection?.map((item: any, idx: number) => {
          return renderCategoryListItem(item, idx)
        })}
      </div>
    )
  }

  return (
    <section
      id={props.componentId}
      className={cn(
        'relative group my-2 scroll-mt-160px',
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
          .${gridCol3ClassName} {
            /* Desktop */
            @media (min-width: 1025px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            /* Laptop */
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            /* Tablet */
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            /* Mobile */
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .${gridCol4ClassName} {
            @media (min-width: 1025px) {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .${gridCol5ClassName} {
            @media (min-width: 1025px) {
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .${gridCol6ClassName} {
            @media (min-width: 1025px) {
              grid-template-columns: repeat(6, minmax(0, 1fr));
            }
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          `}</_JSXStyle>
      {header && (
        <div className="px-2 mb-4 flex justify-between items-center w-full">
          <h3 className={cn('flex-1 mobile:!text-lg', headerClassName)}>
            {header}
          </h3>
          {category?.urlKey && buttonLabel && (
            <Link href={`category/${category?.urlKey}`}>{renderButton()}</Link>
          )}
        </div>
      )}
      <div className="w-full">{renderCollectionList()}</div>
    </section>
  )
}

export default memo(CategoryListSlide)
