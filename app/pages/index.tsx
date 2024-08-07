import {
  selectConfig,
  setConfigDevice,
  setLanguage,
  setMenu,
  setStoreLayout,
  wrapper
} from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import AppLayout from '@components/AppLayout/AppLayout'
import { NextSeo } from 'next-seo'
import { builderURL, mediaURL } from '@dropgala/utils/utils'
import {
  fetchPageLayout,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu
} from '@api'
import getMobileDetect from '@dropgala/utils/isMobile'
import { LanguageType } from '@dropgala/types/config.type'
import Cookies from 'cookies'
import { CookieNames, StoreLayoutNames } from '@dropgala/types/common.type'
import React, { useEffect } from 'react'
import { StoreBuilder } from '@dropgala/types'
import _JSXStyle from 'styled-jsx/style'

interface PageProps {
  pageProps: {
    menu: CategoryType[]
    popularProducts: ProductType[]
    host: { host: string; alias: string }
  }
}

const HomePage = ({ pageProps }: PageProps) => {
  const { host } = pageProps
  const { layout, language, ...storeConfig } = useAppSelector(selectConfig)
  console.log({ layout, language, ...storeConfig })

  useEffect(() => {
    if (window.location !== window.parent.location) {
      window.parent.postMessage(
        {
          source: StoreBuilder.GALA_CMS_BUILDER_PAGE,
          layout: layout
        },
        builderURL
      )
    }
  }, [])

  return (
    <>
      <NextSeo
        title={storeConfig?.storeName}
        description={storeConfig?.seo?.metaDescription}
        canonical={`https://${host?.host}`}
        openGraph={{
          url: `https://${host?.host}`,
          title: storeConfig?.seo?.metaTitle,
          description: storeConfig?.seo?.metaDescription,
          images: [
            {
              url: !!storeConfig?.seo?.ogImage?.length
                ? `${mediaURL}/${storeConfig?.seo?.ogImage[0].image}`
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
    </>
  )
}

HomePage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, locale } = context
    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)

    const cookies = new Cookies(req, res)
    const cuid = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      // Check if store has locales
      store.dispatch(await fetchStoreConfig(context, alias))
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

      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setMenu(menu))
      store.dispatch(setStoreLayout({ layout }))
      store.dispatch(setConfigDevice({ device }))

      // Client cart
      // if (cuid) {
      //   const clientCartStore = await fetchClientCart({
      //     alias,
      //     storeLanguageId,
      //     cuid,
      //     storeId
      //   })
      //   if (clientCartStore) {
      //     store.dispatch(clientCartStore)
      //   }
      // }

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

export default HomePage
