import Layout from '@containers/layout'
import { setMenu } from '@dropgala/store'
import { CategoryType } from '@dropgala/types/category.type'
import { useAppDispatch } from '@hooks/use-store'
import apolloClient from '@lib/apollo-client'
import { MENU } from 'graphql/menu'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'

interface Props {
  menu: CategoryType[]
}

export default function Home({ menu }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMenu({ menu }))
  }, [])

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

  // fetch for client info
  const { data } = await apolloClient.query<{menu: CategoryType[], error: any}>({
    query: MENU,
    variables: {
      alias: 'store'
    }
  })

  const { menu, error } = data ?? {}

  console.log({ menu, error })

  return {
    props: {
      menu,
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer'
      ]))
    }
  }
}
