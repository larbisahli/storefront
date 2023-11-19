import { selectConfig, selectMenu, wrapper } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { HeroBannerType } from '@dropgala/types/slider.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import ProductCard from '@components/productCard'
import HeroBanner from '@components/HeroBanner'
import HomePageCategories from '@components/HomePageCategories'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import AppLayout from '@components/layout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import {
  fetchStoreConfig,
  fetchStoreHeroSlides,
  fetchStoreLanguage,
  fetchStoreMenu,
  fetchStorePopularProducts,
  fetchStorePromoSlide
} from '@gRPC/handlers'
import { useState } from 'react'
import { LanguageType } from '@dropgala/types/config.type'

interface PageProps {
  pageProps: {
    menu: CategoryType[]
    heroSlider: HeroBannerType[]
    popularProducts: ProductType[]
    host: { host: string; alias: string }
  }
}

const HomePage = ({ pageProps }: PageProps) => {
  const storeConfig = useAppSelector(selectConfig)
  const { menu } = useAppSelector(selectMenu)

  const { host, heroSlider = [], popularProducts } = pageProps

  console.log({ storeConfig })

  const [x, setX] = useState(false)

  return (
    <>
      <NextSeo
        title={storeConfig?.storeName}
        description={storeConfig?.seo?.metaDescription}
        canonical={`https://${host?.host}`}
        openGraph={{
          url: `https://${host?.host}`,
          title: storeConfig?.seo?.metaTitle,
          description: storeConfig?.seo?.metaDescription,
          images: [
            {
              url: !!storeConfig?.seo?.ogImage?.length
                ? `${mediaURL}/${storeConfig?.seo?.ogImage[0].image}`
                : '',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/png'
            }
          ],
          siteName: storeConfig?.storeName
        }}
        twitter={{
          handle: storeConfig?.seo?.twitterHandle,
          site: '@site',
          cardType: 'summary_large_image'
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: !!storeConfig?.favicon?.length
              ? `${mediaURL}/${storeConfig?.favicon[0].image}`
              : ''
          },
          {
            rel: 'apple-touch-icon',
            href: 'https://www.test.ie/touch-icon-ipad.jpg',
            sizes: '76x76'
          },
          {
            rel: 'manifest',
            href: '/manifest.json'
          }
        ]}
      />
      <div className="mb-44">
        {/* HERO SECTION */}
        <section>
          <HeroBanner heroSlider={heroSlider} />
        </section>
        {/* CATEGORY SECTION */}
        <section className="mb-12 mx-2">
          {<HomePageCategories menu={menu} />}
        </section>
        {/* BESTSELLERS SECTION */}
        <section className="mb-5 mx-2">
          <div className="text-2xl font-semibold">Best Sellers</div>
          {!isEmpty(popularProducts) ? (
            <div
              className="grid grid-cols-1 my-10 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-
                            xl:grid-cols-5 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-4 2xl:gap-5"
            >
              {popularProducts.map((product) => (
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
    </>
  )
}

HomePage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, locale } = context

    const { host, alias = '' } = getHost(req)

    const storeId = undefined

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      const popularProducts = [] //await fetchStorePopularProducts(alias)

      // Redux Store
      store.dispatch(await fetchStoreConfig(alias, storeId))

      // Check Locale
      const { ConfigReducer } = store.getState()
      const locales = ConfigReducer.locales as LanguageType[]

      if (!locales) {
        return {
          notFound: true
        }
      }

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
      const storeLanguageId = currentLocale?.id!

      store.dispatch(await fetchStoreLanguage(storeLanguageId, alias, storeId))
      store.dispatch(await fetchStoreMenu(alias, storeLanguageId, storeId))
      // store.dispatch(await fetchStorePromoSlide(alias))

      const heroSlider = await fetchStoreHeroSlides(alias, storeLanguageId)

      return {
        props: {
          host: { host, alias },
          heroSlider,
          popularProducts
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

export default HomePage
