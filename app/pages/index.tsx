import Layout from '@containers/layout'
import { selectConfig, setMenu } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import { HeroBannerType } from '@dropgala/types/slider.type'
import { useAppDispatch, useAppSelector } from '@hooks/use-store'
import { renderComponent } from '@lib/packages'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import CategoryService from '@service/category.service';
import SlideService from '@service/slide.service'

interface Props {
  menu: CategoryType[]
  heroSlider: HeroBannerType[]
  host: { host: string; subdomain: string }
}

export default function Home({ host, menu, heroSlider = [] }: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(selectConfig)

  console.log({ host, menu, heroSlider })

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
  const alias = req.headers.host?.split('.')[0]

  try {
    // -----------<RPC>--------------
    const categoryService = new CategoryService();
    const slideService = new SlideService()
    const { sliders = [], error: slideError } = await slideService.getHeroSlide('store')
    const { menu = [], error: menuError } = await categoryService.getMenu('store')

    console.log('looooooooooooooool', {sliders, menu, menuError,slideError: slideError})

    if(slideError | menuError){
      throw {slideError, menuError}
    }

    return {
      props: {
        host: { host, alias },
        menu,
        heroSlider: sliders,
        ...(await serverSideTranslations(locale!, [
          'common',
          'forms',
          'menu',
          'footer'
        ]))
      }
    }
  } catch (error) {
    console.log('error: --------------<>', { error })
    return {
      notFound: true
    }
  }
}
