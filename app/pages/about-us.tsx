import { selectConfig, wrapper } from '@dropgala/store'
import { useAppSelector } from '@hooks/useStore'
import { GetServerSideProps } from 'next'
import { getHost } from 'utils'
import AppLayout from '@components/layout/AppLayout'
import { NextSeo } from 'next-seo'
import { mediaURL } from '@dropgala/utils/utils'
import {
  fetchStoreConfig,
  fetchStoreMenu,
  fetchStorePromoSlide
} from '@gRPC/handlers'
import { fetchStorePage } from '@gRPC/handlers/page'
import { PageType } from '@dropgala/types/page.type'
import PageCms from '@components/pageCms'

interface PageProps {
  pageProps: {
    page: PageType
    host: { host: string; alias: string }
  }
}

const AboutUsPage = ({ pageProps }: PageProps) => {
  const storeConfig = useAppSelector(selectConfig)
  const { host, page } = pageProps

  return (
    <>
      <NextSeo
        title={page?.name}
        description={page?.seo?.metaDescription}
        canonical={`https://${host?.host}/about-us`}
        openGraph={{
          url: `https://${host?.host}/about-us`,
          title: page?.seo?.metaTitle,
          description: page?.seo?.metaDescription,
          images: [
            {
              url: !!page?.seo?.ogImage?.length
                ? `${mediaURL}/${page?.seo?.ogImage[0].image}`
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
        <section className="mb-12 mx-2">
          <PageCms page={page} />
        </section>
      </div>
    </>
  )
}

AboutUsPage.Layout = AppLayout

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, locale } = context

    const { host, alias = '' } = getHost(req)

    try {
      if (!alias) {
        throw { error: { message: 'alias not specified' } }
      }

      const page = await fetchStorePage(alias, 'about-us')

      // Redux Store
      store.dispatch(await fetchStoreConfig(alias))
      store.dispatch(await fetchStoreMenu(alias))
      store.dispatch(await fetchStorePromoSlide(alias))

      return {
        props: {
          host: { host, alias },
          page
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

export default AboutUsPage
