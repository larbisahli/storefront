import {
  CartDrawerPlaceholder,
  FooterPlaceholder,
  HeaderPlaceholder,
  HeroBannerPlaceholder,
  MenuDrawerPlaceholder,
  ProductCardPlaceholder
} from '@components/placeholders'
import type { ComponentNames, StoreThemes } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'

const mapDynamicComponents = {
  '@dropgala/luma': {
    Header: dynamic(() => import('@dropgala/luma/components/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: false
    }),
    Footer: dynamic(() => import('@dropgala/luma/components/Footer'), {
      loading: () => <FooterPlaceholder />,
      ssr: false
    }),
    MenuDrawer: dynamic(() => import('@dropgala/luma/components/MenuDrawer'), {
      loading: () => <MenuDrawerPlaceholder />,
      ssr: false
    }),
    CartDrawer: dynamic(() => import('@dropgala/luma/components/CartDrawer'), {
      loading: () => <CartDrawerPlaceholder />,
      ssr: false
    }),
    HeroBanner: dynamic(() => import('@dropgala/luma/components/HeroBanner'), {
      loading: () => <HeroBannerPlaceholder />,
      ssr: false
    }),
    HomePageCategories: dynamic(
      () => import('@dropgala/luma/components/HomepageCategories'),
      {
        loading: () => <HeroBannerPlaceholder />,
        ssr: false
      }
    ),
    ProductCard: dynamic(
      () => import('@dropgala/luma/components/ProductCard'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    ProductDetails: dynamic(
      () => import('@dropgala/luma/components/ProductDetails'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    RelatedProducts: dynamic(
      () => import('@dropgala/luma/components/RelatedProducts'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    Breadcrumb: dynamic(() => import('@dropgala/luma/components/Breadcrumb'), {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }),
    CheckoutBreadcrumb: dynamic(
      () => import('@dropgala/luma/components/CheckoutBreadcrumb'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    CheckoutHeader: dynamic(
      () => import('@dropgala/luma/components/CheckoutHeader'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    )
  }
}

export default function renderRemoteComponent<Props>(
  storeTheme: StoreThemes,
  componentName: ComponentNames,
  props: Props,
  children?: (
    props: any
  ) => React.ReactNode | React.ReactNode[] | Element | null
): ReactElement<Props, any> | null {
  const Component = mapDynamicComponents[storeTheme][componentName]

  if (Component) {
    return <Component {...props}>{children ?? null}</Component>
  }

  return null
}
