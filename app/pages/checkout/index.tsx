import { wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import CheckoutLayout from '@components/AppLayout/CheckoutLayout'
import Cookies from 'cookies'

import { CookieNames } from '@dropgala/types/common.type'
import { fetchClientCheckout } from '@gRPC/handlers/checkout'
import { fetchStoreConfig } from '@gRPC/handlers'
import { LanguageType } from '@dropgala/types/config.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

export default function CheckoutPage() {
  return null
}

CheckoutPage.Layout = CheckoutLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, locale } = context
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

      // Client cart
      if (cuid) {
        const clientCheckout = await fetchClientCheckout(
          context,
          alias,
          storeLanguageId,
          cuid
        )
        const checkout = clientCheckout?.payload.checkout
        if (checkout?.stepsConfig?.currentStep) {
          return {
            redirect: {
              permanent: false,
              destination: `/checkout/${checkout?.stepsConfig?.currentStep}`
            }
          }
        }
      }

      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
