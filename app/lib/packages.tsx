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

const dynamicComponents = {
  '@dropgala/luma': {
    Header: dynamic(() => import('@dropgala/luma/components/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: false
    }),
    Footer: dynamic(() => import('@dropgala/luma/components/Footer'), {
      loading: () => <FooterPlaceholder />,
      ssr: false
    }),
    MenuDrawerView: dynamic(
      () => import('@dropgala/luma/components/Drawer/MenuDrawerView'),
      {
        loading: () => <MenuDrawerPlaceholder />,
        ssr: false
      }
    ),
    CartDrawerView: dynamic(
      () => import('@dropgala/luma/components/Drawer/CartDrawerView'),
      {
        loading: () => <CartDrawerPlaceholder />,
        ssr: false
      }
    ),
    HeroBanner: dynamic(
      () => import('@dropgala/luma/components/Banner/HeroBlock'),
      {
        loading: () => <HeroBannerPlaceholder />,
        ssr: false
      }
    ),
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
    )
  }
}

export function renderComponent<Props>(
  storeTheme: StoreThemes,
  componentName: ComponentNames,
  props: Props,
  children?: (
    props: any
  ) => React.ReactNode | React.ReactNode[] | Element | null
): ReactElement<Props, any> | null {
  const Component = dynamicComponents[storeTheme][componentName]

  if (Component) {
    // @ts-ignore
    return <Component {...props}>{children ?? null}</Component>
  }

  return null
}

export default dynamicComponents
