import { selectConfig, setConfigDevice, wrapper } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { HeroBannerType } from '@dropgala/types/slider.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import AppLayout from '@components/AppLayout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import {
  fetchPageLayout,
  fetchStoreConfig,
  fetchStoreHomePageCategories,
  fetchStoreLanguage,
  fetchStoreMenu,
  fetchStorePopularProducts
} from '@gRPC/handlers'
import getMobileDetect from '@dropgala/utils/isMobile'
import { LanguageType } from '@dropgala/types/config.type'
import { fetchClientCart } from '@gRPC/handlers/checkout'
import Cookies from 'cookies'
import { CookieNames, StoreLayoutNames } from '@dropgala/types/common.type'
import React, { useEffect } from 'react'
import { setCollection } from '@dropgala/store/Collections'
import { StoreBuilder } from '@dropgala/types'

interface PageProps {
  pageProps: {
    menu: CategoryType[]
    heroSlider: HeroBannerType[]
    popularProducts: ProductType[]
    host: { host: string; alias: string }
  }
}

const HomePage = ({ pageProps }: PageProps) => {
  const { host } = pageProps
  const config = useAppSelector(selectConfig)
  const { layout, language, ...storeConfig } = useAppSelector(selectConfig)
  console.log({ config })

  useEffect(() => {
    if (window.location !== window.parent.location) {
      window.parent.postMessage(
        {
          source: StoreBuilder.GALA_CMS_BUILDER_PAGE,
          layout: layout
        },
        'http://localhost:3001'
      )
    }
  }, [])

  return (
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
    const storeId = undefined

    console.log('========>', { alias })

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

      console.log({ templateId })

      // Redux Store
      // NOTE: use promise.all
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(await fetchStoreLanguage(storeLanguageId, alias, storeId))
      store.dispatch(await fetchStoreMenu(alias, storeLanguageId, storeId))
      store.dispatch(
        await fetchStoreHomePageCategories(alias, storeLanguageId, storeId)
      )
      store.dispatch(
        await fetchPageLayout({
          alias,
          page: StoreLayoutNames.HOMEPAGE,
          templateId,
          storeLanguageId,
          isCustom: false,
          storeId
        })
      )

      // Client cart
      if (cuid) {
        const clientCartStore = await fetchClientCart({
          alias,
          storeLanguageId,
          cuid,
          storeId
        })
        if (clientCartStore) {
          store.dispatch(clientCartStore)
        }
      }

      // Page data props
      const popularProducts = await fetchStorePopularProducts(
        alias,
        storeLanguageId,
        storeId
      )
      store.dispatch(
        setCollection({
          collection: {
            id: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
            items: popularProducts
          }
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

export default HomePage
