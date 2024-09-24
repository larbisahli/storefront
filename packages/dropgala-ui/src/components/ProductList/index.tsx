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
import cn from 'clsx'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { selectCollection } from '@dropgala/store/Collections'

interface Props extends StoreProps {}

const ProductList: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { language } = useAppSelector(selectConfig)
  const products = useAppSelector((state) =>
    selectCollection(state, 'categoryProducts')
  )
  const { __ } = useTranslation(language, 'exception')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

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

  return (
    <section
      id={props.componentId}
      className={cn(
        'relative group px-1 scroll-mt-160px max-w-default mx-auto'
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
          <div className="grid grid-cols-1 my-10 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-5 desktop:grid-cols-6">
            {products?.map((item: ProductType) => renderProductCard(item))}
          </div>
        </>
      )}
    </section>
  )
}

export default ProductList
