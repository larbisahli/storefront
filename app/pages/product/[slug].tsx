import {
  wrapper,
  selectConfig,
  setConfigDevice,
  setMobileHeaderTransition,
  setLanguage,
  setMenu,
  setStoreLayout,
  setConfig,
  setCart
} from '@dropgala/store'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { useEffect, useMemo } from 'react'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import AppLayout from '@components/AppLayout/AppLayout'
import { NextSeo } from 'next-seo'
import { ProductBreadcrumbs, mediaURL } from '@dropgala/utils/utils'
import Head from 'next/head'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from 'cookies'
import { CookieNames, StoreLayoutNames } from '@dropgala/types/common.type'
import { selectProduct, setProduct } from '@dropgala/store/Product'
import { setBreadcrumb } from '@dropgala/store/Breadcrumbs'
import {
  fetchClientCart,
  fetchPageLayout,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu,
  fetchStoreProduct
} from '@lib/api'
import { fetchStoreCategory } from '@lib/api/category'
import { XSRFHandler } from '@middleware/utils'

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
  const dispatch = useDispatch()

  const storeConfig = useAppSelector(selectConfig)
  const { product } = useAppSelector(selectProduct)

  const { host } = pageProps

  const { productSeo } = product

  useEffect(() => {
    dispatch(setMobileHeaderTransition({ allow: false }))
  }, [slug])

  const {
    metaTitle,
    metaImage,
    metaKeywords,
    metaDescription,
    slug: keyUrl = ''
  } = productSeo ?? {}

  return (
    <>
      <NextSeo
        title={product?.name}
        description={metaDescription}
        canonical={`https://${host?.host}/product/${keyUrl}`}
        openGraph={{
          url: `https://${host?.host}/product/${keyUrl}`,
          title: metaTitle,
          description: metaDescription,
          images: [
            {
              url: !!metaImage?.length
                ? `${mediaURL}/${metaImage[0].image}`
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
        <meta name="keywords" content={metaKeywords} />
      </Head>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, locale, params } = context
    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)

    const cookies = new Cookies(req, res)
    const cuid = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const slug = params?.slug as string

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      if (!slug) {
        throw { error: { message: 'slug not specified' } }
      }

      // ** STORE CONFIG **
      const { csrfToken = null, csrfError = null } = await XSRFHandler(context)
      const config = await fetchStoreConfig(alias)
      store.dispatch(
        setConfig({
          storeConfig: {
            csrf: { csrfToken, csrfError },
            ...config
          }
        })
      )

      // Check if store has locales
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
      const languageId = currentLocale?.id!
      const device = getMobileDetect(userAgent)
      const templateId = ConfigReducer.templateId as string

      const [storeLanguage, menu, layout, product, clientCartStore] =
        await Promise.all([
          await fetchStoreLanguage(languageId, alias),
          await fetchStoreMenu(languageId, alias),
          await fetchPageLayout({
            alias,
            page: StoreLayoutNames.PRODUCT_PAGE,
            templateId,
            languageId,
            isCustom: false
          }),
          await fetchStoreProduct({
            slug,
            alias,
            languageId
          }),
          await fetchClientCart({
            alias,
            languageId,
            cuid
          })
        ])

      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setMenu(menu))
      store.dispatch(setStoreLayout({ layout }))
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(setProduct({ product }))
      store.dispatch(setCart({ cart: clientCartStore }))
      store.dispatch(
        setBreadcrumb({
          name: product?.name ?? null,
          breadcrumbs: ProductBreadcrumbs(product?.categories ?? [])
        })
      )

      return {
        props: {
          host: { host, alias }
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
