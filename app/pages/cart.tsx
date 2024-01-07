import { setConfigDevice, wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getHost } from 'utils'
import CheckoutBreadcrumb from '@components/CheckoutBreadcrumb'
import CheckoutLayout from '@components/layout/CheckoutLayout'
import CheckoutCartItems from '@components/CheckoutCartItems'
import OrderSummary from '@components/OrderSummary'
import { fetchStoreConfig, fetchStoreLanguage } from '@gRPC/handlers'
import { LanguageType } from '@dropgala/types/config.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import getMobileDetect from '@dropgala/utils/isMobile'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import { fetchClientCart } from '@gRPC/handlers/checkout'

interface Props {
  host: { host: string; subdomain: string }
}

export default function CartPage({ host }: Props) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Cart</title>
      </Head>
      <div className="mb-44 mx-2">
        <section className="w-full flex justify-center my-30px">
          <CheckoutBreadcrumb />
        </section>
        <div className="flex w-full lg:flex-row flex-col border border-gray-200 rounded-md">
          {/* 1 */}
          <div className="flex-1">
            <CheckoutCartItems />
          </div>
          {/* 2 */}
          <div
            style={{ background: 'rgba(0,0,0,0.03)' }}
            className="pb-5 lg:w-[40%] xl:w-[45%] w-full"
          >
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  )
}

CartPage.Layout = CheckoutLayout

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
