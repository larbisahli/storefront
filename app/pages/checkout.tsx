import { wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getHost } from 'utils'
import CheckoutBreadcrumb from '@components/CheckoutBreadcrumb'
import CheckoutLayout from '@components/layout/CheckoutLayout'
import { fetchStoreConfig } from '@gRPC/handlers'
import CheckoutForm from '@components/CheckoutForm'
import CheckoutItems from '@components/CheckoutItems'

interface Props {
  host: { host: string; subdomain: string }
}

export default function CheckoutPage({ host }: Props) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Checkout</title>
      </Head>
      <div className="mb-44">
        <section className="w-full flex justify-center my-30px">
          <CheckoutBreadcrumb />
        </section>
        <section className="flex w-full lg:flex-row flex-col-reverse border border-gray-300 rounded-md">
          {/* Checkout Form */}
          <div className="flex-1">
            <CheckoutForm isLoading={false} />
          </div>
          {/* Checkout items */}
          <div
            style={{ background: 'rgba(0,0,0,0.05)' }}
            className="pb-5 lg:w-[40%] xl:w-[45%] w-full"
          >
            <CheckoutItems />
          </div>
        </section>
      </div>
    </>
  )
}

CheckoutPage.Layout = CheckoutLayout

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
