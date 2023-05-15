import { setMenu } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { HeroBannerType } from '@dropgala/types/slider.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import CategoryService from '@gRPC/service/category.service'
import SlideService from '@gRPC/service/slide.service'
import { getHost } from 'utils'
import ProductService from '@gRPC/service/product.service'
import CheckoutBreadcrumb from '@components/CheckoutBreadcrumb'
import CheckoutLayout from '@components/layout/CheckoutLayout'

interface Props {
  menu: CategoryType[]
  heroSlider: HeroBannerType[]
  popularProducts: ProductType[]
  host: { host: string; subdomain: string }
}

export default function CartPage({
  host,
  menu,
  heroSlider = [],
  popularProducts
}: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log({ host, menu, heroSlider, popularProducts })
    dispatch(setMenu({ menu }))
    // setWildcard(window.location.hostname.split(".")[0])
  }, [])

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
      <div className="mb-44">
        <section className="w-full flex justify-center my-30px">
          <CheckoutBreadcrumb />
        </section>
        <div className="flex w-full lg:flex-row flex-col border border-gray-200 rounded-md">
          {/* 1 */}
          {/* <div className="flex-1">
            <CheckoutCartItems />
          </div> */}
          {/* 2 */}
          {/* <div
            style={{ background: 'rgba(0,0,0,0.03)' }}
            className="pb-5 lg:w-[40%] xl:w-[45%] w-full"
          >
            <OrderSummary />
          </div> */}
        </div>
      </div>
    </>
  )
}

CartPage.Layout = CheckoutLayout

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
