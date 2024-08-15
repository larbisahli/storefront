import {
  selectConfig,
  setConfig,
  setConfigDevice,
  setLanguage,
  wrapper
} from '@dropgala/store'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import { LanguageType } from '@dropgala/types/config.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import getMobileDetect from '@dropgala/utils/isMobile'
import { useAppSelector } from '@hooks/useStore'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import ConfirmationSummary from '@components/ConfirmationSummary'
import CheckoutLayout from '@components/AppLayout/CheckoutLayout'
import { fetchStoreConfig, fetchStoreLanguage } from '@dropgala/query/api'
import { XSRFHandler } from '@middleware/utils'

interface Props {
  host: { host: string; subdomain: string }
}

export default function OrderConfirmationPage({ host }: Props) {
  const storeConfig = useAppSelector(selectConfig)
  const { __ } = useTranslation(storeConfig?.language, 'common')
  return (
    <>
      <NextSeo
        title={__('Checkout')}
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
        <section className="w-full">
          <ConfirmationSummary />
        </section>
      </div>
    </>
  )
}

OrderConfirmationPage.Layout = CheckoutLayout

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

      const [storeLanguage] = await Promise.all([
        await fetchStoreLanguage(languageId, alias)
      ])

      store.dispatch(setConfigDevice({ device }))
      store.dispatch(setLanguage({ storeLanguage }))

      // Client cart

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
