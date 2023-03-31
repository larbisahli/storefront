import Layout from '@containers/layout'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamicComponents from '@lib/packages'

interface Props {}

export default function Home(props: Props) {
  console.log({ dynamicComponents })

  return (
    <Layout>
      <Head>
        <meta name="Description" content="Put your description here." />
        <title>Dropgala</title>
      </Head>
      <div>Storefront</div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  }
}
