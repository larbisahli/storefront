import Layout from '@containers/layout'
import { selectConfig, setHeroSlide, setMenu } from '@dropgala/store'
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
}

export default function Home({ menu, heroSlider = [] }: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(selectConfig)

  useEffect(() => {
    dispatch(setMenu({ menu }))
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
          <div className='text-2xl font-semibold'>Best Sellers</div>
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context

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
    console.log('--------------<>', error)
    return {
      props: {
        menu: [],
        ...(await serverSideTranslations(locale!, [
          'common',
          'forms',
          'menu',
          'footer'
        ]))
      }
    }
  }
}
