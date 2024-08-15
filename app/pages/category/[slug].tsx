import {
  wrapper,
  selectConfig,
  setConfigDevice,
  setMenu,
  setLanguage,
  setStoreLayout,
  setConfig,
  setCart
} from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import AppLayout from '@components/AppLayout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import Cookies from 'cookies'
import { CookieNames, StoreLayoutNames } from '@dropgala/types/common.type'
import { setCollection } from '@dropgala/store/Collections'
import { selectCategory, setCategory } from '@dropgala/store/Category'
import { setBreadcrumb } from '@dropgala/store/Breadcrumbs'
import {
  fetchClientCart,
  fetchPageLayout,
  fetchStoreCategoryProducts,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu
} from '@dropgala/query/api'
import { fetchStoreCategory } from '@dropgala/query/api/category'
import { XSRFHandler } from '@middleware/utils'
import { initializeApollo } from '@dropgala/query/graphql/client'
import { gql, useQuery } from '@apollo/client'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`

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

  const currentPage = page as string

  const category = useAppSelector(selectCategory)

  const { host, products = [] } = pageProps

  console.log({ products })

  const [categoryProducts, setCategoryProducts] = useState<{
    [key: string]: ProductType[]
  }>({})
  const [isProductLimitReached, setIsProductLimitReached] = useState(false)

  useEffect(() => {
    if (!isEmpty(products)) {
      setCategoryProducts((prev) => {
        return {
          ...prev,
          [currentPage]: products
        }
      })
      setIsProductLimitReached(false)
    } else {
      setIsProductLimitReached(true)
    }
  }, [products])

  /**
   * In case the same menu link was clicked again
   */
  useEffect(() => {
    if (!isEmpty(products)) {
      setCategoryProducts(() => {
        return { [currentPage]: products }
      })
      setIsProductLimitReached(false)
    } else {
      setCategoryProducts({})
      setIsProductLimitReached(true)
    }
  }, [slug])

  const productList = useMemo(() => {
    return (
      Object.keys(categoryProducts)
        ?.map((key) => {
          return categoryProducts[key]
        })
        ?.flat() ?? []
    )
  }, [categoryProducts])

  const { metaTitle, metaImage, metaRobots, metaDescription, urlKey } = category

  const { data } = useQuery(ViewerQuery)

  console.log({ data })

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
    const {
      req,
      res,
      locale,
      params,
      query: { page }
    } = context

    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)

    const cookies = new Cookies(req, res)
    const cuid = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const slug = params?.slug as string

    const currentPage =
      isNaN(parseInt(page as string)) || parseInt(page as string) === 0
        ? 1
        : parseInt(page as string)

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

      const [
        storeLanguage,
        menu,
        category,
        layout,
        products = [],
        clientCartStore
      ] = await Promise.all([
        await fetchStoreLanguage(languageId, alias),
        await fetchStoreMenu(languageId, alias),
        await fetchStoreCategory({
          slug,
          alias,
          languageId
        }),
        await fetchPageLayout({
          alias,
          page: StoreLayoutNames.CATEGORY_PAGE,
          templateId,
          languageId,
          isCustom: false
        }),
        await fetchStoreCategoryProducts({
          slug,
          alias,
          page: currentPage,
          languageId
        }),
        await fetchClientCart({
          alias,
          languageId,
          cuid
        })
      ])

      // const apolloClient = initializeApollo();

      // await apolloClient.query({
      //   query: ViewerQuery,
      // });

      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setMenu(menu))
      store.dispatch(setStoreLayout({ layout }))
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(setCategory({ category }))
      store.dispatch(setCart({ cart: clientCartStore }))
      store.dispatch(
        setBreadcrumb({
          name: null,
          breadcrumbs: category?.breadcrumbs ?? []
        })
      )
      store.dispatch(
        setCollection({
          collection: {
            id: 'categoryProducts',
            items: products
          }
        })
      )

      return {
        props: {
          host: { host, alias }
          // initialApolloState: apolloClient.cache.extract(),
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
