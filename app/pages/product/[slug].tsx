import { selectConfig, setMenu } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import CategoryService from '@gRPC/service/category.service'
import { getHost } from 'utils'
import ProductService from '@gRPC/service/product.service'
import ProductDetails from '@components/productDetails'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ProductCard from '@components/productCard'
import renderRemoteComponent from '@lib/packages'
import { ComponentNames } from '@dropgala/types'
import Breadcrumb from '@components/Breadcrumb'
import AppLayout from '@components/layout/AppLayout'

interface Props {
  menu: CategoryType[]
  product: ProductType
}

export default function ProductPage({ menu, product = {} }: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(selectConfig)

  console.log({ product })

  useEffect(() => {
    console.log({ product, menu })
    dispatch(setMenu({ menu }))
    // setWildcard(window.location.hostname.split(".")[0])
  }, [])

  const { relatedProducts = [], upsellProducts = [] } = product

  const renderRelatedProducts = () => {
    if (isEmpty(relatedProducts)) {
      return null
    }

    return renderRemoteComponent(
      theme,
      ComponentNames.RELATED_PRODUCTS,
      {
        title: 'Related Products',
        products: relatedProducts
      },
      (props) => <ProductCard {...props} />
    )
  }

  const renderUpsellProducts = () => {
    if (isEmpty(upsellProducts)) {
      return null
    }

    return renderRemoteComponent(
      theme,
      ComponentNames.RELATED_PRODUCTS,
      {
        title: 'We found other products you might like!',
        products: upsellProducts
      },
      (props) => <ProductCard {...props} />
    )
  }

  return (
    <>
      <Head>
        <meta name="Description" content="Put your description here." />
        <title>{product?.name}</title>
      </Head>
      <div className="mb-44 max-w-[1300px] 2xxl:max-w-[1500px] mx-auto">
        {/* PRODUCT DETAIL PAGE */}
        <section className="mb-5 py-35px px-10px">
          <div className="pt-6 lg:pt-7">
            <div className="mx-auto max-w-[1920px]">
              <Breadcrumb
                name={product?.name!}
                category={product?.categories![0]}
              />
            </div>
          </div>
          <div className="">
            {!isEmpty(product) && <ProductDetails product={product} />}
          </div>
        </section>
        <section className="mt-20">
          {/* Related products */}
          {renderRelatedProducts()}
        </section>
        <section className="mt-20">
          {/* Upsells */}
          {renderUpsellProducts()}
        </section>
      </div>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, params } = context

  const { host, alias } = getHost(req)

  const slug = params?.slug

  try {
    // -----------<Remote Procedure Calls>--------------
    const productService = new ProductService()
    const categoryService = new CategoryService()

    const { menu = [], error: menuError } = await categoryService.getMenu(
      'store'
    )

    const { product, error: productError } =
      await productService.getStoreProduct('store', slug as string)

    if (isEmpty(product) || menuError || productError) {
      throw { menuError, productError }
    }

    return {
      props: {
        host: { host, alias },
        menu,
        product,
        ...(await serverSideTranslations(locale!, [
          'common',
          'forms',
          'menu',
          'footer'
        ]))
      }
    }
  } catch (error) {
    console.log('error: --------------<>', { error })
    return {
      notFound: true
    }
  }
}
