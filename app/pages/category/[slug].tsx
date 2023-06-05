import { setMenu, setConfig } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useMemo, useState } from 'react'
import { getHost } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Breadcrumb from '@components/Breadcrumb'
import AppLayout from '@components/layout/AppLayout'
import { CategoryService, ConfigService, ProductService } from '@gRPC/services'
import type { ConfigType } from '@dropgala/types/config.type'
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

interface Props {
  menu: CategoryType[]
  category: CategoryType
  products: ProductType[]
  storeConfig: ConfigType
  host: {
    host: string
    alias: string
  }
}

export default function ProductPage({
  host,
  menu,
  category,
  products = [],
  storeConfig
}: Props) {
  const {
    query: { slug, page = 1 }
  } = useRouter()

  const currentPage = page as string

  const [layout, setLayout] = useState<ProductCardLayout>(
    ProductCardLayout.Grid
  )
  const [categoryProducts, setCategoryProducts] = useState<{
    [key: string]: ProductType[]
  }>({})
  const [isProductLimitReached, setIsProductLimitReached] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMenu({ menu }))
    dispatch(setConfig({ storeConfig }))
  }, [])

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

  const { categorySeo } = category

  return (
    <>
      <NextSeo
        title={categorySeo?.metaTitle}
        description={categorySeo?.metaDescription}
        canonical={`https://${host?.host}/category/${categorySeo?.urlKey}`}
        openGraph={{
          url: `https://${host?.host}/category/${categorySeo?.urlKey}`,
          title: categorySeo?.metaTitle,
          description: categorySeo?.metaDescription,
          images: [
            {
              url: !!categorySeo?.metaImage?.length
                ? `${mediaURL}/${categorySeo?.metaImage[0].image}`
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
      <Head>
        {categorySeo?.metaRobots && (
          <meta name="robots" content={categorySeo?.metaRobots as string} />
        )}
      </Head>
      <div className="mb-44 max-w-[1300px] 2xxl:max-w-[1500px] mx-auto">
        <section className="mb-5 py-35px px-10px">
          <div className="pt-6 lg:pt-7">
            <div className="mx-auto max-w-[1920px]">
              <Breadcrumb breadcrumbs={categorySeo?.breadcrumbs} />
            </div>
          </div>
          <div className="">
            {!isEmpty(category) && <CategoryDetails category={category} />}
          </div>
        </section>
        {!isEmpty(category?.children) && categorySeo?.metaTitle && (
          <div className="text-sm lg:text-lg mx-2 text-gray-950 font-medium my-5">
            {categorySeo?.metaTitle}
          </div>
        )}
        <section className="mx-2">
          {<CategoryList categories={category?.children ?? []} />}
        </section>
        <section className="mx-2 my-10 ">
          <Miscellaneous layout={layout} setLayout={setLayout} />
        </section>
        {/* CATEGORY PRODUCTS SECTION */}
        <section className="mb-5 mt-20 mx-2">
          {!isEmpty(categoryProducts) ? (
            <div
              className={cn('grid grid-cols-1 my-10 gap-3 md:gap-4 2xl:gap-5', {
                'xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-xl:grid-cols-5 2xl:grid-cols-4 3xl:grid-cols-5':
                  layout === ProductCardLayout.Grid
              })}
            >
              {productList?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout={layout}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center pt-10px md:pt-40px lg:pt-20px pb-40px">
              <h3 className="text-24px text-gray-900 font-bold mt-35px mb-0 text-center">
                No product found :(
              </h3>
            </div>
          )}
          {!isProductLimitReached && (
            <div className="mt-5">
              <Pagination />
            </div>
          )}
        </section>
      </div>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    req,
    locale,
    params,
    query: { page }
  } = context

  const { host, alias = '' } = getHost(req)

  const slug = params?.slug as string

  const currentPage =
    isNaN(parseInt(page as string)) || parseInt(page as string) === 0
      ? 1
      : parseInt(page as string)

  try {
    if (!alias || !slug) {
      throw { error: { message: 'alias or name not specified' } }
    }

    // -----------<Remote Procedure Calls>--------------
    const storeConfig = new ConfigService()
    const productService = new ProductService()
    const categoryService = new CategoryService()

    const { config, error: configError } = await storeConfig.getConfig(alias)

    const { menu = [], error: menuError } = await categoryService.getMenu(alias)

    const { category = null, error: categoryError } =
      await categoryService.getCategory(alias, slug)

    const { products, error: productsError } =
      await productService.getStoreCategoryProducts(alias, slug, currentPage)

    if (
      isEmpty(category) ||
      menuError ||
      categoryError ||
      configError ||
      productsError
    ) {
      throw { menuError, categoryError, productsError }
    }

    return {
      props: {
        host: { host, alias },
        menu,
        category,
        products,
        storeConfig: config,
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
