/**
 * **** Generated file, Do Not Edit ****
 */
import {
  BreadcrumbPlaceholder,
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
import { useAppDispatch, useAppSelector } from '@hooks/useStore'

export const mapDynamicComponents = {
  '@dropgala/luma': {
    Header: dynamic(() => import('@dropgala/luma/components/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: true
    }),
    Footer: dynamic(() => import('@dropgala/luma/components/Footer'), {
      loading: () => <FooterPlaceholder />,
      ssr: true
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
        ssr: true
      }
    ),
    ProductCard: dynamic(
      () => import('@dropgala/luma/components/ProductCard'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    ProductDetails: dynamic(
      () => import('@dropgala/luma/components/ProductDetails'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    LinkedProducts: dynamic(
      () => import('@dropgala/luma/components/LinkedProducts'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    Breadcrumb: dynamic(() => import('@dropgala/luma/components/Breadcrumb'), {
      loading: () => <BreadcrumbPlaceholder />,
      ssr: false
    }),
    CheckoutBreadcrumb: dynamic(
      () => import('@dropgala/luma/components/CheckoutBreadcrumb'),
      {
        loading: () => <BreadcrumbPlaceholder />,
        ssr: false
      }
    ),
    CheckoutHeader: dynamic(
      () => import('@dropgala/luma/components/CheckoutHeader'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    CheckoutCartItems: dynamic(
      () => import('@dropgala/luma/components/CheckoutCartItems'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    OrderSummary: dynamic(
      () => import('@dropgala/luma/components/OrderSummary'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CategoryDetails: dynamic(
      () => import('@dropgala/luma/components/CategoryDetails'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CategoryList: dynamic(
      () => import('@dropgala/luma/components/CategoryList'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    Pagination: dynamic(() => import('@dropgala/luma/components/Pagination'), {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }),
    Miscellaneous: dynamic(
      () => import('@dropgala/luma/components/Miscellaneous'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    PageCms: dynamic(() => import('@dropgala/luma/components/PageCms'), {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }),
    CheckoutInformation: dynamic(
      () => import('@dropgala/luma/components/CheckoutInformation'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CheckoutItems: dynamic(
      () => import('@dropgala/luma/components/CheckoutItems'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CheckoutShipping: dynamic(
      () => import('@dropgala/luma/components/CheckoutShipping'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CheckoutPayment: dynamic(
      () => import('@dropgala/luma/components/CheckoutPayment'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    )
  },
  '@dropgala/heim': {
    Header: dynamic(() => import('@dropgala/heim/components/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: true
    }),
    Footer: dynamic(() => import('@dropgala/heim/components/Footer'), {
      loading: () => <FooterPlaceholder />,
      ssr: true
    }),
    MenuDrawer: dynamic(() => import('@dropgala/heim/components/MenuDrawer'), {
      loading: () => <MenuDrawerPlaceholder />,
      ssr: false
    }),
    CartDrawer: dynamic(() => import('@dropgala/heim/components/CartDrawer'), {
      loading: () => <CartDrawerPlaceholder />,
      ssr: false
    }),
    HeroBanner: dynamic(() => import('@dropgala/heim/components/HeroBanner'), {
      loading: () => <HeroBannerPlaceholder />,
      ssr: false
    }),
    HomePageCategories: dynamic(
      () => import('@dropgala/heim/components/HomepageCategories'),
      {
        loading: () => <HeroBannerPlaceholder />,
        ssr: true
      }
    ),
    ProductCard: dynamic(
      () => import('@dropgala/heim/components/ProductCard'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    ProductDetails: dynamic(
      () => import('@dropgala/heim/components/ProductDetails'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    LinkedProducts: dynamic(
      () => import('@dropgala/heim/components/LinkedProducts'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    Breadcrumb: dynamic(() => import('@dropgala/heim/components/Breadcrumb'), {
      loading: () => <BreadcrumbPlaceholder />,
      ssr: false
    }),
    CheckoutBreadcrumb: dynamic(
      () => import('@dropgala/heim/components/CheckoutBreadcrumb'),
      {
        loading: () => <BreadcrumbPlaceholder />,
        ssr: false
      }
    ),
    CheckoutHeader: dynamic(
      () => import('@dropgala/heim/components/CheckoutHeader'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: false
      }
    ),
    CheckoutCartItems: dynamic(
      () => import('@dropgala/heim/components/CheckoutCartItems'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    OrderSummary: dynamic(
      () => import('@dropgala/heim/components/OrderSummary'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CategoryDetails: dynamic(
      () => import('@dropgala/heim/components/CategoryDetails'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    CategoryList: dynamic(
      () => import('@dropgala/heim/components/CategoryList'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    Pagination: dynamic(() => import('@dropgala/heim/components/Pagination'), {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }),
    Miscellaneous: dynamic(
      () => import('@dropgala/heim/components/Miscellaneous'),
      {
        loading: () => <ProductCardPlaceholder />,
        ssr: true
      }
    ),
    PageCms: dynamic(() => import('@dropgala/heim/components/PageCms'), {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    })
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

  if (!Component) {
    return null
  }

  return (
    <Component
      {...{
        useAppDispatch,
        useAppSelector,
        ...props
      }}
    >
      {children ?? null}
    </Component>
  )
}
