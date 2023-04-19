import Layout from '@containers/layout'
import { selectConfig, setMenu } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import { HeroBannerType } from '@dropgala/types/slider.type'
import { useAppDispatch, useAppSelector } from '@hooks/use-store'
import apolloClient from '@lib/apollo-client'
import { renderComponent } from '@lib/packages'
import { HOMEPAGE_QUERY } from 'graphql/HomePage'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'

interface Props {
  menu: CategoryType[]
  heroSlider: HeroBannerType[]
  host: { host: string; subdomain: string }
}

export default function Home({ host, menu, heroSlider = [] }: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(selectConfig)

  console.log({ host })

  useEffect(() => {
    dispatch(setMenu({ menu }))
    // setWildcard(window.location.hostname.split(".")[0])
  }, [])

  return (
    <Layout>
      <Head>
        <meta name="Description" content="Put your description here." />
        <title>Dropgala</title>
      </Head>
      <div>
        {/* HERO SECTION */}
        <section>
          {renderComponent(theme, ComponentNames.HERO_BANNER, {
            infiniteLoop: true,
            items: heroSlider
          })}
        </section>
        {/* CATEGORY SECTION */}
        <section className="mb-12">
          {renderComponent(theme, ComponentNames.HOMEPAGE_CATEGORIES, {
            categories: menu
          })}
        </section>
        {/* BESTSELLERS SECTION */}
        <section className="mb-5">
          <div className="text-2xl font-semibold">Best Sellers</div>
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale } = context

  // TODO: Create a global function
  const host = req.headers.host ?? ''
  const subdomain = req.headers.host?.split('.')[0]

  try {
    // fetch for client info
    const { data } = await apolloClient.query<{
      menu: CategoryType[]
      heroSlider: HeroBannerType[]
      error: any
    }>({
      query: HOMEPAGE_QUERY,
      fetchPolicy: 'no-cache',
      variables: {
        alias: 'store'
      }
    })

    const { menu, heroSlider, error } = data ?? {}

    console.log({ error })

    return {
      props: {
        host: { host, subdomain },
        menu,
        heroSlider,
        ...(await serverSideTranslations(locale!, [
          'common',
          'forms',
          'menu',
          'footer'
        ]))
      }
    }
  } catch (error) {
    console.log('error: --------------<>', error)
    return {
      notFound: true
    }
  }
}
