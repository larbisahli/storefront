import React from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { StoreProps, selectConfig } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { getComponentFromChildren, resolvePath } from '@dropgala/utils/helpers'
import { ModuleGroup, StoreLayoutComponentContentType } from '@dropgala/types'
import { selectCollection } from '@dropgala/store/Collections'

interface Props extends StoreProps {}

const ProductList: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'exception')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})

  const collection = useAppSelector((state) =>
    selectCollection(
      state,
      // data?.collectionId
      'categoryProducts'
    )
  )

  const products = resolvePath<ProductType[]>(data, 'collection', [])

  const renderProductNotFound = () => {
    const ProductNotFound = getComponentFromChildren(
      children,
      ModuleGroup.PRODUCT_NOT_FOUND
    )
    if (!ProductNotFound) return null
    return ProductNotFound
  }

  const renderProductCard = (product: ProductType) => {
    const ProductCard = getComponentFromChildren(
      children,
      ModuleGroup.PRODUCT_CARD
    )
    if (!ProductCard) return null
    return React.cloneElement(ProductCard, { product })
  }

  const renderPagination = () => {
    const Pagination = getComponentFromChildren(
      children,
      ModuleGroup.PAGINATION
    )
    if (!Pagination) return null
    return Pagination
  }

  if (isEmpty(products)) {
    return (
      <div
        className="w-full flex flex-col items-center
       pt-10px md:pt-40px lg:pt-20px pb-40px"
      >
        {renderProductNotFound()}
      </div>
    )
  }

  const isProductLimitReached = false

  return (
    <section className="mt-8 max-w-default mx-auto">
      <h3 className="text-2xl font-semibold">{data?.name}</h3>
      <div
        className="grid grid-cols-1 my-10 mobile:grid-cols-2
        tablet:grid-cols-3 desktop:grid-cols-xl:grid-cols-5
        laptop:grid-cols-4 desktop:grid-cols-5 gap-3 md:gap-4 2xl:gap-5"
      >
        {products?.map((items: ProductType) => renderProductCard(items))}
      </div>
      {!isProductLimitReached && (
        <div className="mt-5">{renderPagination()}</div>
      )}
    </section>
  )
}

export default ProductList
