import {
  selectConfig,
  setCart,
  setConfig,
  setConfigDevice,
  setLanguage,
  setMenu,
  setStoreLayout,
  wrapper
} from '@dropgala/store'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import AppLayout from '@components/AppLayout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'

import { PageType } from '@dropgala/types/page.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { LanguageType } from '@dropgala/types/config.type'
import Breadcrumb from '@components/Breadcrumb'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import { useRouter } from 'next/router'
import {
  fetchClientCart,
  fetchPageLayout,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu
} from '@lib/api'
import { XSRFHandler } from '@middleware/utils'

interface PageProps {
  pageProps: {
    page: PageType
    host: { host: string; alias: string }
  }
}

const Page = ({ pageProps }: PageProps) => {
  const storeConfig = useAppSelector(selectConfig)
  const { host } = pageProps
  const {
    query: { slug }
  } = useRouter()
  console.log('Page :>>', { storeConfig, slug })

  const page = {}
  return (
    <>
      <NextSeo
        title={page?.name}
        description={page?.metaDescription}
        canonical={`https://${host?.host}/${slug}`}
        openGraph={{
          url: `https://${host?.host}/${slug}`,
          title: page?.metaTitle,
          description: page?.metaDescription,
          images: [
            {
              url: !!page?.ogImage?.length
                ? `${mediaURL}/${page?.ogImage[0].image}`
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
      <section className="mb-5">
        {/* <div className="">
          <Breadcrumb breadcrumbs={[]} name={page.name} />
        </div> */}
      </section>
      <section className="mb-44">{/* <PageCms page={page} /> */}</section>
    </>
  )
}

Page.Layout = AppLayout

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

      const [storeLanguage, menu, layout, clientCartStore] = await Promise.all([
        await fetchStoreLanguage(languageId, alias),
        await fetchStoreMenu(languageId, alias),
        await fetchPageLayout({
          alias,
          page: slug,
          templateId,
          languageId,
          isCustom: true
        }),
        await fetchClientCart({
          alias,
          languageId,
          cuid
        })
      ])

      store.dispatch(setConfigDevice({ device }))
      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setMenu(menu))
      store.dispatch(setStoreLayout({ layout }))
      store.dispatch(setCart({ cart: clientCartStore }))

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

export default Page
