import React from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { StoreProps, selectConfig } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { getComponentFromChildren, resolvePath } from '@dropgala/utils/helpers'
import {
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import Link from 'next/link'
import cn from 'clsx'
import BuilderPlaceholder from '../common/builderPlaceholder'
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'

interface Props extends StoreProps {}

const ProductListGridWidget: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'exception')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const headerStyle = styles?.header

  const collection = resolvePath<ProductType[]>(data, 'collection', [])
  const products = [
    ...collection,
    ...collection,
    ...collection,
    ...collection,
    ...collection,
    ...collection
  ]

  const renderContentNotFound = () => {
    const ContentNotFound = getComponentFromChildren(
      children,
      ModuleGroup.CONTENT_NOT_FOUND
    )
    if (!ContentNotFound) return null
    return ContentNotFound
  }

  const renderProductCard = (product: ProductType) => {
    const ProductCard = getComponentFromChildren(
      children,
      ModuleGroup.PRODUCT_CARD
    )
    if (!ProductCard) return null
    return React.cloneElement(ProductCard, { product })
  }

  const renderButton = () => {
    const Button = getComponentFromChildren(children, ModuleGroup.BUTTON)
    if (!Button) return null
    return React.cloneElement(Button, {
      label: data?.buttonLabel,
      size: 'small'
    })
  }

  const headerClassName = `header-${props.componentId}`

  return (
    <section
      id={props.componentId}
      className={cn(
        'relative group px-1 scroll-mt-160px',
        styles?.sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full'
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
      <_JSXStyle id={props.componentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
      `}</_JSXStyle>
      {isEmpty(products) && (
        <div
          className="w-full flex flex-col items-center
       pt-10px md:pt-40px lg:pt-20px pb-40px"
        >
          {renderContentNotFound()}
        </div>
      )}
      {!isEmpty(products) && (
        <>
          <div className="flex justify-between items-center">
            <h3 className={headerClassName}>{data?.header}</h3>
            {data?.category?.urlKey && (
              <Link
                href={{
                  pathname: '/category/[slug]',
                  query: { slug: data?.category?.urlKey }
                }}
              >
                {renderButton()}
              </Link>
            )}
          </div>
          <div
            className={cn(
              'grid grid-cols-1 my-10 mobile:grid-cols-2',
              data?.productsPerView === 6 &&
                'tablet:grid-cols-3 laptop:grid-cols-5 desktop:grid-cols-6',
              data?.productsPerView === 5 &&
                'tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5',
              data?.productsPerView === 4 &&
                'tablet:grid-cols-3 desktop:grid-cols-4',
              data?.productsPerView === 3 && 'desktop:grid-cols-3'
            )}
          >
            {products?.map((item: ProductType) => renderProductCard(item))}
          </div>
        </>
      )}
    </section>
  )
}

export default ProductListGridWidget
