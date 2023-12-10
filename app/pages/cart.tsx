import { wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getHost } from 'utils'
import CheckoutBreadcrumb from '@components/CheckoutBreadcrumb'
import CheckoutLayout from '@components/layout/CheckoutLayout'
import CheckoutCartItems from '@components/CheckoutCartItems'
import OrderSummary from '@components/OrderSummary'
import { fetchStoreConfig } from '@gRPC/handlers'

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
    const { req, locale } = context

    const { host, alias = '' } = getHost(req)

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      // Redux Store
      store.dispatch(await fetchStoreConfig(alias))

      return {
        props: {
          host: { host, alias }
          // ...(await serverSideTranslations(locale!, [
          //   'common',
          //   'forms',
          //   'menu',
          //   'footer'
          // ]))
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
