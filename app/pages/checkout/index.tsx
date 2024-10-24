import { setConfig, wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import CheckoutLayout from '@components/AppLayout/CheckoutLayout'
import Cookies from 'cookies'

import { CookieNames } from '@dropgala/types/common.type'
import { LanguageType } from '@dropgala/types/config.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { fetchClientCheckout, fetchStoreConfig } from '@dropgala/query/api'
import { storeMaintenanceHandler, XSRFHandler } from '@middleware/utils'

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

      // Client cart
      if (cuid) {
        const checkout = await fetchClientCheckout({
          context,
          alias,
          languageId,
          cuid
        })
        console.log({ checkout })
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
