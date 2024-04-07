import React from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { StoreProps, selectConfig } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { getComponentFromChildren } from '@dropgala/utils/helpers'
import { ModuleNames } from '@dropgala/types'

interface Props extends StoreProps {
  popularProducts: ProductType[]
  children: JSX.Element[]
}

const ProductListWidget: React.FC<Props> = ({
  useAppSelector,
  popularProducts,
  children
}) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'exception')

  const renderProductNotFound = () => {
    const ProductNotFound = getComponentFromChildren(
      children,
      ModuleNames.PRODUCT_NOT_FOUND
    )
    if (!ProductNotFound) return null
    return ProductNotFound
  }

  const renderProductCard = (product: ProductType) => {
    const ProductCard = getComponentFromChildren(
      children,
      ModuleNames.PRODUCT_CARD
    )
    if (!ProductCard) return null
    return React.cloneElement(ProductCard, { product })
  }

  if (isEmpty(popularProducts)) {
    return (
      <div
        className="w-full flex flex-col items-center
       pt-10px md:pt-40px lg:pt-20px pb-40px"
      >
        {renderProductNotFound()}
      </div>
    )
  }

  return (
    <section className="mt-8">
      <div className="text-2xl lg:text-3xl text-center lg:text-left font-semibold">
        {__('Best Sellers')}
      </div>
      <div
        className="grid grid-cols-1 my-10 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-
          xl:grid-cols-5 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-4 2xl:gap-5"
      >
        {popularProducts.map((product) => (
          <>{renderProductCard(product)}</>
        ))}
      </div>
    </section>
  )
}

export default ProductListWidget
