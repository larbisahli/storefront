import Layout from '@containers/layout'
import { selectConfig, setMenu } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import type { HeroBannerType } from '@dropgala/types/slider.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { renderComponent } from '@lib/packages'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import CategoryService from '@gRPC/service/category.service'
import SlideService from '@gRPC/service/slide.service'
import { getHost } from 'utils'
import ProductService from '@gRPC/service/product.service'
import ProductCard from '@components/productCard'

interface Props {
  menu: CategoryType[]
  heroSlider: HeroBannerType[]
  popularProducts: ProductType[]
  host: { host: string; subdomain: string }
}

export default function ProductPage({
  host,
  menu,
  heroSlider = [],
  popularProducts
}: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(selectConfig)

  useEffect(() => {
    console.log({ host, menu, heroSlider, popularProducts })
    dispatch(setMenu({ menu }))
    // setWildcard(window.location.hostname.split(".")[0])
  }, [])

  return (
    <Layout>
      <Head>
        <meta name="Description" content="Put your description here." />
        <title>Dropgala</title>
      </Head>
      <div className="mb-44">
        {/* HERO SECTION */}
        <section>
          {renderComponent(theme, ComponentNames.HERO_BANNER, {
            infiniteLoop: true,
            items: heroSlider
          })}
        </section>
        {/* CATEGORY SECTION */}
        <section className="mb-12 mx-2">
          {renderComponent(theme, ComponentNames.HOMEPAGE_CATEGORIES, {
            categories: menu
          })}
        </section>
        {/* BESTSELLERS SECTION */}
        <section className="mb-5 mx-2">
          <div className="text-2xl font-semibold">Best Sellers</div>
          {popularProducts?.length > 1 ? (
            <div className="grid grid-cols-1 my-10 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols- xl:grid-cols-5 2xl:grid-cols-4 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5">
              {[
                ...popularProducts,
                ...popularProducts,
                ...popularProducts,
                ...popularProducts
              ].map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center pt-10px md:pt-40px lg:pt-20px pb-40px">
              <h3 className="text-24px text-gray-900 font-bold mt-35px mb-0 text-center">
                No product found :(
              </h3>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale } = context

  const { host, alias } = getHost(req)

  try {
    // -----------<Remote Procedure Calls>--------------
    const productService = new ProductService()
    const categoryService = new CategoryService()
    const slideService = new SlideService()

    const { sliders = [], error: slideError } = await slideService.getHeroSlide(
      'store'
    )
    const { menu = [], error: menuError } = await categoryService.getMenu(
      'store'
    )
    const { products: popularProducts = [], error: productError } =
      await productService.getPopular('store')

    if (slideError | menuError | productError) {
      throw { slideError, menuError, productError }
    }

    return {
      props: {
        host: { host, alias },
        menu,
        heroSlider: sliders,
        popularProducts,
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
