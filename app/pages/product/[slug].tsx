import { wrapper, selectConfig, setConfigDevice } from '@dropgala/store'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import { getHost } from 'utils'
import ProductDetails from '@components/productDetails'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Breadcrumb from '@components/Breadcrumb'
import AppLayout from '@components/layout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import LinkedProducts from '@components/LinkedProducts'
import Head from 'next/head'
import {
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu,
  fetchStoreProduct,
  fetchStorePromoSlide
} from '@gRPC/handlers'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'

interface PageProps {
  pageProps: {
    product: ProductType
    host: {
      host: string
      alias: string
    }
  }
}

export default function ProductPage({ pageProps }: PageProps) {
  const storeConfig = useAppSelector(selectConfig)

  const { host, product = {} } = pageProps

  console.log({ product })

  const {
    productSeo,
    relatedProducts = [],
    upsellProducts = [],
    categories = []
  } = product

  const selectedCategory = useMemo(() => {
    const selectedCate = categories?.sort(
      (a, b) =>
        (b?.categorySeo?.breadcrumbsPriority ?? 0) -
          (a?.categorySeo?.breadcrumbsPriority ?? 0) ?? 0
    )[0]
    return {
      id: selectedCate?.id,
      name: selectedCate?.name,
      categorySeo: {
        breadcrumbs: [
          {
            categoryLevel: 0,
            categoryName: selectedCate?.name,
            categoryUrl: selectedCate?.categorySeo?.urlKey
          }
        ]
      }
    }
  }, [categories])

  return (
    <>
      <NextSeo
        title={product?.name}
        description={productSeo?.metaDescription}
        canonical={`https://${host?.host}/product/${productSeo?.slug}`}
        openGraph={{
          url: `https://${host?.host}/product/${productSeo?.slug}`,
          title: productSeo?.metaTitle,
          description: productSeo?.metaDescription,
          images: [
            {
              url: !!productSeo?.metaImage?.length
                ? `${mediaURL}/${productSeo?.metaImage[0].image}`
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
      <Head>
        <meta name="keywords" content={productSeo?.metaKeywords} />
      </Head>
      <div className="mb-44 max-w-[1300px] xl:max-w-[1500px] mx-auto">
        {/* PRODUCT DETAIL PAGE */}
        <section className="mb-5 py-35px px-10px">
          <div className="pt-6 lg:pt-7">
            <div className="mx-auto max-w-[1920px]">
              <Breadcrumb
                name={product?.name!}
                breadcrumbs={selectedCategory?.categorySeo?.breadcrumbs ?? []}
              />
            </div>
          </div>
          <div className="">
            {!isEmpty(product) && <ProductDetails product={product} />}
          </div>
        </section>
        <section className="mt-20">
          {/* Related products */}
          <LinkedProducts title="Related Products" products={relatedProducts} />
        </section>
        <section className="mt-20">
          {/* Upsells */}
          <LinkedProducts
            title="We found other products you might like!"
            products={upsellProducts}
          />
        </section>
      </div>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, locale, params } = context
    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)
    const storeId = undefined

    const slug = params?.slug

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      // Check if store has locales
      store.dispatch(await fetchStoreConfig(alias, storeId))
      const { ConfigReducer } = store.getState()
      const locales = ConfigReducer.locales as LanguageType[]

      if (!locales) {
        return {
          notFound: true
        }
      }

      // Check if incoming locale is available, if not redirect to default local
      const currentLocale = locales?.find((l) => l.localeId === locale)
      if (isEmpty(currentLocale)) {
        const defaultLocale = locales?.find((l) => l.isDefault)
        return {
          redirect: {
            destination: `/${defaultLocale?.localeId}`,
            permanent: false
          }
        }
      }

      // Get current store language id for resource request
      const storeLanguageId = currentLocale?.id!
      const device = getMobileDetect(userAgent)

      // Redux Store
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(await fetchStoreLanguage(storeLanguageId, alias, storeId))
      store.dispatch(await fetchStoreMenu(alias, storeLanguageId, storeId))
      store.dispatch(
        await fetchStorePromoSlide(alias, storeLanguageId, storeId)
      )

      // Page props data
      const product = await fetchStoreProduct(
        slug as string,
        alias,
        storeLanguageId,
        storeId
      )

      return {
        props: {
          host: { host, alias },
          product
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
