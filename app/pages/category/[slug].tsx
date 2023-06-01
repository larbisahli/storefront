import { setMenu, setConfig } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import type { ProductType } from '@dropgala/types/product.type'
import { useAppDispatch } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
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
import HomePageCategories from '@components/HomePageCategories'

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
  const dispatch = useAppDispatch()

  console.log({ category })

  useEffect(() => {
    dispatch(setMenu({ menu }))
    dispatch(setConfig({ storeConfig }))
  }, [])

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
        {/* PRODUCT DETAIL PAGE */}
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
        <section className="mb-12 mx-2">
          {/* {<HomePageCategories menu={category?.children} />} */}
        </section>
        <section className="mt-20">
          {/* Related products */}
          {/* <LinkedProducts title="Related Products" products={relatedProducts} /> */}
        </section>
        <section className="mt-20">
          {/* Upsells */}
          {/* <LinkedProducts
            title="We found other products you might like!"
            products={upsellProducts}
          /> */}
        </section>
      </div>
    </>
  )
}

ProductPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, params } = context

  const { host, alias = '' } = getHost(req)

  const slug = params?.slug as string

  console.log({ slug })

  try {
    if (!alias || !slug) {
      throw { error: { message: 'alias or name not specified' } }
    }

    // -----------<Remote Procedure Calls>--------------
    const storeConfig = new ConfigService()
    // const productService = new ProductService()
    const categoryService = new CategoryService()

    const { config, error: configError } = await storeConfig.getConfig(alias)

    const { menu = [], error: menuError } = await categoryService.getMenu(alias)

    const { category = null, error: categoryError } =
      await categoryService.getCategory(alias, slug)

    // const { product, error: productError } =
    //   await productService.getStoreProduct(alias, name as string)

    if (isEmpty(category) || menuError || categoryError || configError) {
      throw { menuError, categoryError }
    }

    return {
      props: {
        host: { host, alias },
        menu,
        category,
        // product,
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
