import { wrapper, selectConfig, setConfigDevice } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Breadcrumb from '@components/Breadcrumb'
import AppLayout from '@components/layout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import Head from 'next/head'
import CategoryDetails from '@components/CategoryDetails'
import CategoryList from '@components/CategoryList'
import ProductCard from '@components/productCard'
import Pagination from '@components/Pagination'
import Miscellaneous from '@components/Miscellaneous'
import { ProductCardLayout } from '@dropgala/types'
import cn from 'clsx'
import { useRouter } from 'next/router'
import {
  fetchStoreCategory,
  fetchStoreCategoryProducts,
  fetchStoreConfig,
  fetchStoreLanguage,
  fetchStoreMenu,
  fetchStorePromoSlide
} from '@gRPC/handlers'
import { LanguageType } from '@dropgala/types/config.type'
import getMobileDetect from '@dropgala/utils/isMobile'
import ProductNotFound from '@components/ProductNotFound'

interface PageProps {
  pageProps: {
    category: CategoryType
    products: ProductType[]
    host: {
      host: string
      alias: string
    }
  }
}

export default function ProductPage({ pageProps }: PageProps) {
  const storeConfig = useAppSelector(selectConfig)

  const {
    query: { slug, page = 1 }
  } = useRouter()

  const currentPage = page as string

  const { host, category, products = [] } = pageProps

  const [layout, setLayout] = useState<ProductCardLayout>(
    ProductCardLayout.Grid
  )
  const [categoryProducts, setCategoryProducts] = useState<{
    [key: string]: ProductType[]
  }>({})
  const [isProductLimitReached, setIsProductLimitReached] = useState(false)

  useEffect(() => {
    if (!isEmpty(products)) {
      setCategoryProducts((prev) => {
        return {
          ...prev,
          [currentPage]: products
        }
      })
      setIsProductLimitReached(false)
    } else {
      setIsProductLimitReached(true)
    }
  }, [products])

  /**
   * In case the same menu link was clicked again
   */
  useEffect(() => {
    if (!isEmpty(products)) {
      setCategoryProducts(() => {
        return { [currentPage]: products }
      })
      setIsProductLimitReached(false)
    } else {
      setCategoryProducts({})
      setIsProductLimitReached(true)
    }
  }, [slug])

  const productList = useMemo(() => {
    return (
      Object.keys(categoryProducts)
        ?.map((key) => {
          return categoryProducts[key]
        })
        ?.flat() ?? []
    )
  }, [categoryProducts])

  const {
    metaTitle,
    metaImage,
    breadcrumbs,
    metaRobots,
    metaDescription,
    urlKey
  } = category

  return (
    <>
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        canonical={`https://${host?.host}/category/${urlKey}`}
        openGraph={{
          url: `https://${host?.host}/category/${urlKey}`,
          title: metaTitle,
          description: metaDescription,
          images: [
            {
              url: !!metaImage?.length
                ? `${mediaURL}/${metaImage[0].image}`
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
            rel: 'apple-touch-icon',
            href: `${mediaURL}/${storeConfig?.alias}/webmanifest/favicon/icons/icon_ios_180x180.png`,
            sizes: '180x180'
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: `${mediaURL}/${storeConfig?.alias}/webmanifest/favicon/icons/icon_android_36x36.png`,
            sizes: '36x36'
          },
          {
            rel: 'manifest',
            href: `${mediaURL}/${storeConfig?.alias}/webmanifest/manifest.json`
          }
        ]}
      />
      <Head>
        {metaRobots && <meta name="robots" content={metaRobots as string} />}
      </Head>
      <section className="mb-5 py-35px mx-0 lg:mx-2">
        <div className="pt-6 lg:pt-7">
          <div className="mx-auto max-w-[1920px]">
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </div>
        </div>
        <div className="">
          {!isEmpty(category) && <CategoryDetails category={category} />}
        </div>
      </section>
      {!isEmpty(category?.children) && metaTitle && (
        <div className="text-sm lg:text-lg mx-2 text-gray-950 font-medium my-5">
          {metaTitle}
        </div>
      )}
      <section className="mx-2">
        {<CategoryList categories={category?.children ?? []} />}
      </section>
      <section className="mx-2 my-10 ">
        <Miscellaneous layout={layout} setLayout={setLayout} />
      </section>
      {/* CATEGORY PRODUCTS SECTION */}
      <section className="mb-44 mt-20 mx-2">
        {!isEmpty(categoryProducts) ? (
          <div
            className={cn('grid grid-cols-1 my-10 gap-3 md:gap-4 2xl:gap-5', {
              'xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-xl:grid-cols-5 2xl:grid-cols-4 3xl:grid-cols-5':
                layout === ProductCardLayout.Grid
            })}
          >
            {productList?.map((product) => (
              <ProductCard key={product.id} product={product} layout={layout} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center pt-10px md:pt-40px lg:pt-20px pb-40px">
            <ProductNotFound />
          </div>
        )}
        {!isProductLimitReached && (
          <div className="mt-5">
            <Pagination />
          </div>
        )}
      </section>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const {
      req,
      locale,
      params,
      query: { page }
    } = context

    const userAgent = req.headers['user-agent']
    const { host, alias = '' } = getHost(req)
    const storeId = undefined

    const slug = params?.slug as string

    const currentPage =
      isNaN(parseInt(page as string)) || parseInt(page as string) === 0
        ? 1
        : parseInt(page as string)

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      // Check if store has locales
      store.dispatch(await fetchStoreConfig(alias, storeId))
      const { ConfigReducer } = store.getState()
      const locales = ConfigReducer.locales as LanguageType[]

      if (!locales) {
        return {
          notFound: true
        }
      }

      // Check if incoming locale is available, if not redirect to default local
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

      // Get current store language id for resource request
      const storeLanguageId = currentLocale?.id!
      const device = getMobileDetect(userAgent)

      // Redux Store
      store.dispatch(setConfigDevice({ device }))
      store.dispatch(await fetchStoreLanguage(storeLanguageId, alias, storeId))
      store.dispatch(await fetchStoreMenu(alias, storeLanguageId, storeId))
      store.dispatch(
        await fetchStorePromoSlide(alias, storeLanguageId, storeId)
      )

      // Page data props
      const category = await fetchStoreCategory(
        slug,
        alias,
        storeLanguageId,
        storeId
      )
      const products = await fetchStoreCategoryProducts(
        slug,
        currentPage,
        alias,
        storeLanguageId,
        storeId
      )

      return {
        props: {
          host: { host, alias },
          category,
          products
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
