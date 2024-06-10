import { wrapper, selectConfig, setConfigDevice } from '@dropgala/store'
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
import {
  fetchPageLayout,
  fetchStoreCategory,
  fetchStoreCategoryProducts,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu
} from '@gRPC/handlers'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import Cookies from 'cookies'
import { CookieNames, StoreLayoutNames } from '@dropgala/types/common.type'
import { fetchClientCart } from '@gRPC/handlers/checkout'
import { setCollection } from '@dropgala/store/Collections'
import { selectCategory, setCategory } from '@dropgala/store/Category'
import { setBreadcrumb } from '@dropgala/store/Breadcrumbs'
import { PreviewCategory } from 'utils/data/preview/category'

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
    const storeId = undefined

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
      const templateId = ConfigReducer.templateId as string

      // Redux Store
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(await fetchStoreLanguage(storeLanguageId, alias, storeId))
      store.dispatch(await fetchStoreMenu(alias, storeLanguageId, storeId))

      store.dispatch(
        await fetchPageLayout({
          alias,
          page: StoreLayoutNames.CATEGORY,
          templateId,
          storeLanguageId,
          isCustom: false,
          storeId
        })
      )

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

      store.dispatch(
        setCollection({
          collection: {
            id: 'categoryProducts',
            items: PreviewCategory.categoryProducts
          }
        })
      )
      store.dispatch(setCategory({ category: PreviewCategory }))
      store.dispatch(
        setBreadcrumb({
          name: null,
          breadcrumbs: PreviewCategory?.breadcrumbs ?? []
        })
      )

      return {}
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
