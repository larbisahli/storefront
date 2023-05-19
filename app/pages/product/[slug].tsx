import { selectConfig, setMenu, setConfig } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { getHost } from 'utils'
import ProductDetails from '@components/productDetails'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ProductCard from '@components/productCard'
import renderRemoteComponent from '@lib/packages'
import { ComponentNames } from '@dropgala/types'
import Breadcrumb from '@components/Breadcrumb'
import AppLayout from '@components/layout/AppLayout'
import { CategoryService, ConfigService, ProductService } from '@gRPC/services'
import { ConfigType } from '@dropgala/types/config.type'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'

interface Props {
  menu: CategoryType[]
  product: ProductType
  storeConfig: ConfigType
}

export default function ProductPage({
  menu,
  product = {},
  storeConfig
}: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(selectConfig)

  useEffect(() => {
    dispatch(setMenu({ menu }))
    dispatch(setConfig({ storeConfig }))
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
      <NextSeo
        title={product?.name}
        description={product.productSeo?.metaDescription}
        canonical={product.productSeo?.slug}
        openGraph={{
          url: product.productSeo?.slug,
          title: product.productSeo?.metaTitle,
          description: product.productSeo?.metaDescription,
          images: [
            {
              url: !!product?.thumbnail?.length
                ? `${mediaURL}/${product?.thumbnail[0].image}`
                : '',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/png'
            }
          ],
          siteName: storeConfig?.storeName
        }}
        twitter={{
          handle: storeConfig?.seo?.twitterHandle,
          site: '@site',
          cardType: 'summary_large_image'
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: !!storeConfig?.favicon?.length
              ? `${mediaURL}/${storeConfig?.favicon[0].image}`
              : ''
          },
          {
            rel: 'apple-touch-icon',
            href: 'https://www.test.ie/touch-icon-ipad.jpg',
            sizes: '76x76'
          },
          {
            rel: 'manifest',
            href: '/manifest.json'
          }
        ]}
      />
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
    if (!alias || !slug) {
      throw { error: { message: 'alias or slug not specified' } }
    }

    // -----------<Remote Procedure Calls>--------------
    const storeConfig = new ConfigService()
    const productService = new ProductService()
    const categoryService = new CategoryService()

    const { config, error: configError } = await storeConfig.getConfig(alias)

    const { menu = [], error: menuError } = await categoryService.getMenu(alias)

    const { product, error: productError } =
      await productService.getStoreProduct(alias, slug as string)

    if (isEmpty(product) || menuError || productError || configError) {
      throw { menuError, productError }
    }

    return {
      props: {
        host: { host, alias },
        menu,
        product,
        storeConfig: config,
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
