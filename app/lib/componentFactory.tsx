/**
 * **** Generated file, Do Not Edit ****
 */
import { ComponentNames } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import {
  BreadcrumbPlaceholder,
  CartDrawerPlaceholder,
  FooterPlaceholder,
  HeaderPlaceholder,
  HeroBannerPlaceholder,
  MenuDrawerPlaceholder,
  ProductCardPlaceholder
} from '@dropgala/placeholder'
import { bytesToSize } from 'utils'

const Header = dynamic(() => import('@dropgala/ui/components/Header'), {
  loading: () => <HeaderPlaceholder />,
  ssr: true
})

const Footer = dynamic(() => import('@dropgala/ui/components/Footer'), {
  loading: () => <FooterPlaceholder />,
  ssr: true
})

const MenuDrawer = dynamic(() => import('@dropgala/ui/components/MenuDrawer'), {
  loading: () => <MenuDrawerPlaceholder />,
  ssr: false
})

const CartDrawer = dynamic(() => import('@dropgala/ui/components/CartDrawer'), {
  loading: () => <CartDrawerPlaceholder />,
  ssr: false
})

const HeroBanner = dynamic(() => import('@dropgala/ui/components/HeroBanner'), {
  loading: () => <HeroBannerPlaceholder />,
  ssr: false
})

const HomepageCategories = dynamic(
  () => import('@dropgala/ui/components/HomepageCategories'),
  {
    loading: () => <HeroBannerPlaceholder />,
    ssr: true
  }
)

const ProductCard = dynamic(
  () => import('@dropgala/ui/components/ProductCard'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const ProductDetails = dynamic(
  () => import('@dropgala/ui/components/ProductDetails'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const LinkedProducts = dynamic(
  () => import('@dropgala/ui/components/LinkedProducts'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: false
  }
)

const Breadcrumb = dynamic(() => import('@dropgala/ui/components/Breadcrumb'), {
  loading: () => <BreadcrumbPlaceholder />,
  ssr: false
})

const CheckoutBreadcrumb = dynamic(
  () => import('@dropgala/ui/components/CheckoutBreadcrumb'),
  {
    loading: () => <BreadcrumbPlaceholder />,
    ssr: false
  }
)

const CheckoutHeader = dynamic(
  () => import('@dropgala/ui/components/CheckoutHeader'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: false
  }
)

const CheckoutCartItems = dynamic(
  () => import('@dropgala/ui/components/CheckoutCartItems'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const OrderSummary = dynamic(
  () => import('@dropgala/ui/components/OrderSummary'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CategoryDetails = dynamic(
  () => import('@dropgala/ui/components/CategoryDetails'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CategoryList = dynamic(
  () => import('@dropgala/ui/components/CategoryList'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const Pagination = dynamic(() => import('@dropgala/ui/components/Pagination'), {
  loading: () => <ProductCardPlaceholder />,
  ssr: true
})

const Miscellaneous = dynamic(
  () => import('@dropgala/ui/components/Miscellaneous'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const PageCms = dynamic(() => import('@dropgala/ui/components/PageCms'), {
  loading: () => <ProductCardPlaceholder />,
  ssr: true
})

const CheckoutInformation = dynamic(
  () => import('@dropgala/ui/components/CheckoutInformation'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CheckoutItems = dynamic(
  () => import('@dropgala/ui/components/CheckoutItems'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CheckoutShipping = dynamic(
  () => import('@dropgala/ui/components/CheckoutShipping'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CheckoutPayment = dynamic(
  () => import('@dropgala/ui/components/CheckoutPayment'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const ConfirmationSummary = dynamic(
  () => import('@dropgala/ui/components/ConfirmationSummary'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CheckoutFooter = dynamic(
  () => import('@dropgala/ui/components/CheckoutFooter'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const InstallPrompt = dynamic(
  () => import('@dropgala/ui/components/InstallPrompt'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)
const ProductNotFound = dynamic(
  () => import('@dropgala/ui/components/ProductNotFound'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const CookiePopup = dynamic(
  () => import('@dropgala/ui/components/CookiePopup'),
  {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }
)

const components = new Map<ComponentNames, React.ComponentType<any>>()
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
components.set(ComponentNames.CHECKOUT_FOOTER, CheckoutFooter)
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
components.set(ComponentNames.CONFIRMATION_SUMMARY, ConfirmationSummary)
components.set(ComponentNames.CHECKOUT_ITEMS, CheckoutItems)
components.set(ComponentNames.CHECKOUT_SHIPPING, CheckoutShipping)
components.set(ComponentNames.CHECKOUT_PAYMENT, CheckoutPayment)
components.set(ComponentNames.INSTALL_PROMPT, InstallPrompt)
components.set(ComponentNames.PRODUCT_NOT_FOUND, ProductNotFound)
components.set(ComponentNames.COOKIE_POPUP, CookiePopup)

console.log('components >>>', bytesToSize(components))
console.log('ProductDetails >>>', bytesToSize(ProductDetails))

export default function componentFactory<Props>(
  componentName: ComponentNames,
  props: Props,
  children?: (
    props: any
  ) => React.ReactNode | React.ReactNode[] | Element | null
): ReactElement<Props> | null {
  const Component = components.get(componentName)
  if (!Component) {
    console.warn(
      'Component ' +
        componentName +
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
