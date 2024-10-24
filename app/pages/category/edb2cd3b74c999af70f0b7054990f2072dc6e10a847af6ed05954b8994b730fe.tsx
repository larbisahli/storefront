import {
  wrapper,
  selectConfig,
  setConfigDevice,
  setLanguage,
  setMenu,
  setStoreLayout,
  setConfig
} from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import AppLayout from '@components/AppLayout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import { StoreLayoutNames } from '@dropgala/types/common.type'
import { selectCategory } from '@dropgala/store/Category'
import {
  fetchPageLayout,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu
} from '@dropgala/query/api'
import { storeMaintenanceHandler, XSRFHandler } from '@middleware/utils'

interface PageProps {
  pageProps: {
    category: CategoryType
    products: ProductType[]
    host: {
      host: string
      alias: string
    }
  }
}

export default function ProductPage({ pageProps }: PageProps) {
  const storeConfig = useAppSelector(selectConfig)
  const {
    query: { slug, page = 1 }
  } = useRouter()

  const category = useAppSelector(selectCategory)
  const { host } = pageProps
  const { metaTitle, metaImage, metaRobots, metaDescription, urlKey } = category

  return (
    <>
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        canonical={`https://${host?.host}/category/${urlKey}`}
        openGraph={{
          url: `https://${host?.host}/category/${urlKey}`,
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
        {metaRobots && <meta name="robots" content={metaRobots as string} />}
      </Head>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, locale } = context

    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
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

      // MaintenanceMode Blocker
      const blockSite = await storeMaintenanceHandler(context, config)

      if (blockSite) {
        return {
          redirect: {
            permanent: false,
            destination: '/maintenance'
          }
        }
      }

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

      const [storeLanguage, menu, layout] = await Promise.all([
        await fetchStoreLanguage(languageId, alias),
        await fetchStoreMenu(languageId, alias),
        await fetchPageLayout({
          alias,
          page: StoreLayoutNames.CATEGORY_PAGE,
          templateId,
          languageId,
          isCustom: false
        })
      ])

      store.dispatch(setConfigDevice({ device }))
      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setMenu(menu))
      store.dispatch(setStoreLayout({ layout }))

      // Page data props
      // const category = await fetchStoreCategory(
      //   slug,
      //   alias,
      //   storeLanguageId,
      //   storeId
      // )
      // const products = await fetchStoreCategoryProducts(
      //   slug,
      //   currentPage,
      //   alias,
      //   storeLanguageId,
      //   storeId
      // )

      // store.dispatch(
      //   setCollection({
      //     collection: {
      //       id: 'categoryProducts',
      //       items: PreviewCategory.categoryProducts
      //     }
      //   })
      // )
      // store.dispatch(setCategory({ category: PreviewCategory }))
      // store.dispatch(
      //   setBreadcrumb({
      //     name: null,
      //     breadcrumbs: PreviewCategory?.breadcrumbs ?? []
      //   })
      // )

      return {}
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
