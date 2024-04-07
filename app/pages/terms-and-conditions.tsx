import { selectConfig, setConfigDevice, wrapper } from '@dropgala/store'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import AppLayout from '@components/layout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import {
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu,
  fetchStorePromoSlide
} from '@gRPC/handlers'
import { fetchStorePage } from '@gRPC/handlers/page'
import { PageType } from '@dropgala/types/page.type'
import PageCms from '@components/PageCms'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Breadcrumb from '@components/Breadcrumb'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import { fetchClientCart } from '@gRPC/handlers/checkout'

interface PageProps {
  pageProps: {
    page: PageType
    host: { host: string; alias: string }
  }
}

const TermsAndConditionsPage = ({ pageProps }: PageProps) => {
  const storeConfig = useAppSelector(selectConfig)
  const { host, page } = pageProps

  return (
    <>
      <NextSeo
        title={page?.name}
        description={page?.metaDescription}
        canonical={`https://${host?.host}/terms-and-conditions`}
        openGraph={{
          url: `https://${host?.host}/terms-and-conditions`,
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
        <div className="">
          <Breadcrumb breadcrumbs={[]} name={page.name} />
        </div>
      </section>
      <section className="mb-44">
        <PageCms page={page} />
      </section>
    </>
  )
}

TermsAndConditionsPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, locale } = context
    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)

    const cookies = new Cookies(req, res)
    const cuid = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)
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

      // Redux Store
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(await fetchStoreLanguage(storeLanguageId, alias, storeId))
      store.dispatch(await fetchStoreMenu(alias, storeLanguageId, storeId))
      store.dispatch(
        await fetchStorePromoSlide(alias, storeLanguageId, storeId)
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

      // Page Query
      const page = await fetchStorePage(
        alias,
        storeLanguageId,
        'terms-and-conditions',
        storeId
      )

      return {
        props: {
          host: { host, alias },
          page
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })

export default TermsAndConditionsPage
