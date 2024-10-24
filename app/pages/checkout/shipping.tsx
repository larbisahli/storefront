import {
  selectConfig,
  setCheckout,
  setConfig,
  setConfigDevice,
  setLanguage,
  wrapper
} from '@dropgala/store'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import CheckoutBreadcrumb from '@components/CheckoutBreadcrumb'
import CheckoutLayout from '@components/AppLayout/CheckoutLayout'
import CheckoutItems from '@components/CheckoutItems'
import { LanguageType } from '@dropgala/types/config.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import getMobileDetect from '@dropgala/utils/isMobile'
import { useAppSelector } from '@hooks/useStore'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import CheckoutFooter from '@components/CheckoutFooter'
import CheckoutShipping from '@components/CheckoutShipping'
import { Shipping } from '@dropgala/types/generated/shipping/Shipping'
import {
  fetchAvailableShippings,
  fetchClientCheckout,
  fetchStoreConfig,
  fetchStoreLanguage
} from '@dropgala/query/api'
import { storeMaintenanceHandler, XSRFHandler } from '@middleware/utils'

interface Props {
  pageProps: {
    host: { host: string; subdomain: string }
    shippings: Shipping[]
  }
}

export default function CheckoutShippingPage({ pageProps }: Props) {
  const storeConfig = useAppSelector(selectConfig)
  const { __ } = useTranslation(storeConfig?.language, 'common')
  const { host, shippings = [] } = pageProps
  return (
    <>
      <NextSeo
        noindex
        nofollow
        title={`${__('Shipping')} | ${storeConfig?.storeName}`}
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
      <div className="mb-44 mx-2">
        <section className="w-full flex justify-center my-30px">
          <CheckoutBreadcrumb />
        </section>
        <section className="flex w-full desktop:flex-row flex-col-reverse border border-gray-300 rounded-md">
          {/* Checkout Shipping */}
          <div className="flex-1">
            <div className="px-5 py-3 sm:mt-0 flex justify-center h-full items-start">
              <div className="max-w-[650px] w-full h-full">
                <div className="h-full">
                  <CheckoutShipping shippings={shippings} />
                </div>
              </div>
            </div>
          </div>
          {/* Checkout items */}
          <div
            style={{ background: 'rgba(0,0,0,0.05)' }}
            className="desktop:w-[40%] xl:w-[45%] "
          >
            <CheckoutItems />
          </div>
        </section>
        <section>
          <CheckoutFooter />
        </section>
      </div>
    </>
  )
}

CheckoutShippingPage.Layout = CheckoutLayout

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

      if (!cuid) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
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

      const [storeLanguage, checkout, shippings] = await Promise.all([
        await fetchStoreLanguage(languageId, alias),
        await fetchClientCheckout({
          context,
          alias,
          languageId,
          cuid
        }),
        await fetchAvailableShippings(alias)
      ])

      store.dispatch(setConfigDevice({ device }))
      store.dispatch(setLanguage({ storeLanguage }))
      store.dispatch(setCheckout({ checkout }))

      return {
        props: {
          host: { host, alias },
          shippings
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
