import { selectConfig, setConfigDevice, wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import CheckoutBreadcrumb from '@components/CheckoutBreadcrumb'
import CheckoutLayout from '@components/layout/CheckoutLayout'
import { fetchStoreConfig, fetchStoreLanguage } from '@gRPC/handlers'
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
import { fetchClientCart, fetchClientCheckout } from '@gRPC/handlers/checkout'
import CheckoutFooter from '@components/CheckoutFooter'
import CheckoutShipping from '@components/CheckoutShipping'

interface Props {
  host: { host: string; subdomain: string }
}

export default function CheckoutShippingPage({ host }: Props) {
  const storeConfig = useAppSelector(selectConfig)
  const { __ } = useTranslation(storeConfig?.language, 'common')
  console.log({ storeConfig })
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
        <section className="flex w-full lg:flex-row flex-col-reverse border border-gray-300 rounded-md">
          {/* Checkout Shipping */}
          <div className="flex-1">
            <div className="px-5 py-3 mt-10 sm:mt-0 flex justify-center h-full items-start">
              <div className="max-w-[650px] w-full h-full">
                <div className="mt-5 md:mt-0 h-full">
                  <CheckoutShipping />
                </div>
              </div>
            </div>
          </div>
          {/* Checkout items */}
          <div
            style={{ background: 'rgba(0,0,0,0.05)' }}
            className="lg:w-[40%] xl:w-[45%] "
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

      // Client cart and Checkout
      if (cuid) {
        const clientCart = await fetchClientCart({
          alias,
          storeLanguageId,
          cuid,
          storeId
        })
        const clientCheckout = await fetchClientCheckout(context, cuid)
        if (clientCart) {
          store.dispatch(clientCart)
        }
        if (clientCheckout) {
          store.dispatch(clientCheckout)
        }
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

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
