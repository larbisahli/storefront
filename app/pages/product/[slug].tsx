import {
  wrapper,
  selectConfig,
  setConfigDevice,
  setMobileHeaderTransition
} from '@dropgala/store'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { useEffect, useMemo } from 'react'
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
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

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
  const {
    query: { slug = null }
  } = useRouter()
  const storeConfig = useAppSelector(selectConfig)
  const dispatch = useDispatch()

  const { host, product = {} } = pageProps

  console.log({ product })

  const {
    productSeo,
    relatedProducts = [],
    upsellProducts = [],
    categories = []
  } = product

  useEffect(() => {
    dispatch(setMobileHeaderTransition({ allow: false }))
  }, [slug])

  const breadcrumbs = useMemo(() => {
    const selectedCate = categories?.sort(
      (a, b) =>
        (b?.breadcrumbsPriority ?? 0) - (a?.breadcrumbsPriority ?? 0) ?? 0
    )[0]
    return [
      ...(selectedCate?.parent
        ? [
            {
              categoryLevel: selectedCate?.parent?.level,
              categoryName: selectedCate?.parent?.name,
              categoryUrl: selectedCate?.parent?.urlKey
            }
          ]
        : []),
      ...(selectedCate?.parent?.parent
        ? [
            {
              categoryLevel: selectedCate?.parent?.parent?.level,
              categoryName: selectedCate?.parent?.parent?.name,
              categoryUrl: selectedCate?.parent?.parent?.urlKey
            }
          ]
        : []),
      {
        categoryLevel: selectedCate?.level,
        categoryName: selectedCate?.name,
        categoryUrl: selectedCate?.urlKey
      }
    ]
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
            rel: 'apple-touch-icon',
            href: `${mediaURL}/${storeConfig?.alias}/webmanifest/favicon/icons/icon_ios_180x180.png`,
            sizes: '180x180'
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: `${mediaURL}/${storeConfig?.alias}/webmanifest/favicon/icons/icon_android_36x36.png`,
            sizes: '36x36'
          },
          {
            rel: 'manifest',
            href: `${mediaURL}/${storeConfig?.alias}/webmanifest/manifest.json`
          }
        ]}
      />
      <Head>
        <meta name="keywords" content={productSeo?.metaKeywords} />
      </Head>
      <div className="mb-44 max-w-[1300px] xl:max-w-[1500px] mx-auto">
        {/* PRODUCT DETAIL PAGE */}
        <section className="mb-5">
          <div className="pt-2">
            <div className="mx-auto">
              <Breadcrumb name={product?.name!} breadcrumbs={breadcrumbs} />
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
      store.dispatch(await fetchStoreConfig(context, alias, storeId))
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
