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
import { ComponentNames, StoreThemes } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'

const Header = {
  '@dropgala/luma': dynamic(() => import('@dropgala/luma/components/Header'), {
    loading: () => <HeaderPlaceholder />,
    ssr: true
  })
}
const Footer = {
  '@dropgala/luma': dynamic(() => import('@dropgala/luma/components/Footer'), {
    loading: () => <FooterPlaceholder />,
    ssr: true
  })
}
const MenuDrawer = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/MenuDrawer'),
    {
      loading: () => <MenuDrawerPlaceholder />,
      ssr: false
    }
  )
}
const CartDrawer = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CartDrawer'),
    {
      loading: () => <CartDrawerPlaceholder />,
      ssr: false
    }
  )
}
const HeroBanner = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/HeroBanner'),
    {
      loading: () => <HeroBannerPlaceholder />,
      ssr: false
    }
  )
}
const HomepageCategories = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/HomepageCategories'),
    {
      loading: () => <HeroBannerPlaceholder />,
      ssr: true
    }
  )
}
const ProductCard = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/ProductCard'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const ProductDetails = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/ProductDetails'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const LinkedProducts = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/LinkedProducts'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }
  )
}
const Breadcrumb = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/Breadcrumb'),
    {
      loading: () => <BreadcrumbPlaceholder />,
      ssr: false
    }
  )
}
const CheckoutBreadcrumb = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutBreadcrumb'),
    {
      loading: () => <BreadcrumbPlaceholder />,
      ssr: false
    }
  )
}
const CheckoutHeader = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutHeader'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }
  )
}
const CheckoutCartItems = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutCartItems'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const OrderSummary = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/OrderSummary'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CategoryDetails = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CategoryDetails'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CategoryList = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CategoryList'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const Pagination = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/Pagination'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const Miscellaneous = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/Miscellaneous'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const PageCms = {
  '@dropgala/luma': dynamic(() => import('@dropgala/luma/components/PageCms'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const CheckoutInformation = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutInformation'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutItems = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutItems'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutShipping = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutShipping'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutPayment = {
  '@dropgala/luma': dynamic(
    () => import('@dropgala/luma/components/CheckoutPayment'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}

const components = new Map<
  ComponentNames,
  { [key in StoreThemes]: React.ComponentType<any> }
>()
components.set(ComponentNames.HEADER, Header)
components.set(ComponentNames.FOOTER, Footer)
components.set(ComponentNames.MENU_DRAWER, MenuDrawer)
components.set(ComponentNames.CART_DRAWER, CartDrawer)
components.set(ComponentNames.HERO_BANNER, HeroBanner)
components.set(ComponentNames.HOMEPAGE_CATEGORIES, HomepageCategories)
components.set(ComponentNames.PRODUCT_CARD, ProductCard)
components.set(ComponentNames.PRODUCT_DETAILS, ProductDetails)
components.set(ComponentNames.LINKED_PRODUCTS, LinkedProducts)
components.set(ComponentNames.CHECKOUT_BREADCRUMB, CheckoutBreadcrumb)
components.set(ComponentNames.CHECKOUT_HEADER, CheckoutHeader)
components.set(ComponentNames.BREADCRUMB, Breadcrumb)
components.set(ComponentNames.CHECKOUT_CART_ITEMS, CheckoutCartItems)
components.set(ComponentNames.ORDER_SUMMARY, OrderSummary)
components.set(ComponentNames.CATEGORY_DETAILS, CategoryDetails)
components.set(ComponentNames.CATEGORIES_LIST, CategoryList)
components.set(ComponentNames.PAGINATION, Pagination)
components.set(ComponentNames.MISCELLANEOUS, Miscellaneous)
components.set(ComponentNames.PAGE_CMS, PageCms)
components.set(ComponentNames.CHECKOUT_INFORMATION, CheckoutInformation)
components.set(ComponentNames.CHECKOUT_ITEMS, CheckoutItems)
components.set(ComponentNames.CHECKOUT_SHIPPING, CheckoutShipping)
components.set(ComponentNames.CHECKOUT_PAYMENT, CheckoutPayment)

export default function componentFactory<Props>(
  storeTheme: StoreThemes,
  componentName: ComponentNames,
  props: Props,
  children?: (
    props: any
  ) => React.ReactNode | React.ReactNode[] | Element | null
): ReactElement<Props> | null {
  const modules = components.get(componentName)
  if (isEmpty(modules)) {
    console.warn(
      'Component ' +
        componentName +
        ' cannot be found in componentFactory and skipped from render.'
    )
    return null
  }
  const Component = modules[storeTheme]
  if (!Component) {
    console.warn(
      'Theme ' +
        storeTheme +
        ' cannot be found in componentFactory and skipped from render.'
    )
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
