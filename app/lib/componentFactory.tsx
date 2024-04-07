/**
 * **** Generated file, Do Not Edit ****
 */
import { ModuleNames } from '@dropgala/types/enums.type'
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
import { isEmpty } from '@dropgala/utils/lodashFunctions'

const Header = {
  /* __DEFAULT__ */
  Header: dynamic(() => import('@dropgala/ui/components/Header'), {
    loading: () => <HeaderPlaceholder />,
    ssr: true
  })
}

const Footer = {
  /* __DEFAULT__ */
  Footer: dynamic(() => import('@dropgala/ui/components/Footer'), {
    loading: () => <FooterPlaceholder />,
    ssr: true
  })
}

const MenuDrawer = {
  /* __DEFAULT__ */
  MenuDrawer: dynamic(() => import('@dropgala/ui/components/MenuDrawer'), {
    loading: () => <MenuDrawerPlaceholder />,
    ssr: false
  })
}

const CartDrawer = {
  /* __DEFAULT__ */
  CartDrawer: dynamic(() => import('@dropgala/ui/components/CartDrawer'), {
    loading: () => <CartDrawerPlaceholder />,
    ssr: false
  })
}

const HeroBanner = {
  /* __DEFAULT__ */
  HeroBanner: dynamic(() => import('@dropgala/ui/components/HeroBanner'), {
    loading: () => <HeroBannerPlaceholder />,
    ssr: false
  })
}

const HomepageCategories = {
  /* __DEFAULT__ */
  HomepageCategories: dynamic(
    () => import('@dropgala/ui/components/HomePageCategories'),
    {
      loading: () => <HeroBannerPlaceholder />,
      ssr: true
    }
  )
}
const ProductCard = {
  /* __DEFAULT__ */
  ProductCard: dynamic(() => import('@dropgala/ui/components/ProductCard'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const ProductDetails = {
  /* __DEFAULT__ */
  ProductDetails: dynamic(
    () => import('@dropgala/ui/components/ProductDetails'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const LinkedProducts = {
  /* __DEFAULT__ */
  LinkedProducts: dynamic(
    () => import('@dropgala/ui/components/LinkedProducts'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }
  )
}
const Breadcrumb = {
  /* __DEFAULT__ */
  Breadcrumb: dynamic(() => import('@dropgala/ui/components/Breadcrumb'), {
    loading: () => <BreadcrumbPlaceholder />,
    ssr: false
  })
}
const CheckoutBreadcrumb = {
  /* __DEFAULT__ */
  CheckoutBreadcrumb: dynamic(
    () => import('@dropgala/ui/components/CheckoutBreadcrumb'),
    {
      loading: () => <BreadcrumbPlaceholder />,
      ssr: false
    }
  )
}
const CheckoutHeader = {
  /* __DEFAULT__ */
  CheckoutHeader: dynamic(
    () => import('@dropgala/ui/components/CheckoutHeader'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: false
    }
  )
}
const CheckoutCartItems = {
  /* __DEFAULT__ */
  CheckoutCartItems: dynamic(
    () => import('@dropgala/ui/components/CheckoutCartItems'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const OrderSummary = {
  /* __DEFAULT__ */
  OrderSummary: dynamic(() => import('@dropgala/ui/components/OrderSummary'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const CategoryDetails = {
  /* __DEFAULT__ */
  CategoryDetails: dynamic(
    () => import('@dropgala/ui/components/CategoryDetails'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CategoryList = {
  /* __DEFAULT__ */
  CategoryList: dynamic(() => import('@dropgala/ui/components/CategoryList'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Pagination = {
  /* __DEFAULT__ */
  Pagination: dynamic(() => import('@dropgala/ui/components/Pagination'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Miscellaneous = {
  /* __DEFAULT__ */
  Miscellaneous: dynamic(
    () => import('@dropgala/ui/components/Miscellaneous'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const PageCms = {
  /* __DEFAULT__ */
  PageCms: dynamic(() => import('@dropgala/ui/components/PageCms'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const CheckoutInformation = {
  /* __DEFAULT__ */
  CheckoutInformation: dynamic(
    () => import('@dropgala/ui/components/CheckoutInformation'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutItems = {
  /* __DEFAULT__ */
  CheckoutItems: dynamic(
    () => import('@dropgala/ui/components/CheckoutItems'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutShipping = {
  /* __DEFAULT__ */
  CheckoutShipping: dynamic(
    () => import('@dropgala/ui/components/CheckoutShipping'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutPayment = {
  /* __DEFAULT__ */
  CheckoutPayment: dynamic(
    () => import('@dropgala/ui/components/CheckoutPayment'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const ConfirmationSummary = {
  /* __DEFAULT__ */
  ConfirmationSummary: dynamic(
    () => import('@dropgala/ui/components/ConfirmationSummary'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CheckoutFooter = {
  /* __DEFAULT__ */
  CheckoutFooter: dynamic(
    () => import('@dropgala/ui/components/CheckoutFooter'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const InstallPrompt = {
  /* __DEFAULT__ */
  InstallPrompt: dynamic(
    () => import('@dropgala/ui/components/InstallPrompt'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const ProductNotFound = {
  /* __DEFAULT__ */
  ProductNotFound: dynamic(
    () => import('@dropgala/ui/components/ProductNotFound'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const ProductListWidget = {
  /* __DEFAULT__ */
  ProductListWidget: dynamic(
    () => import('@dropgala/ui/components/ProductListWidget'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CookiePopup = {
  /* __DEFAULT__ */
  CookiePopup: dynamic(() => import('@dropgala/ui/components/CookiePopup'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const PromoBanner = {
  /* __DEFAULT__ */
  PromoBanner: dynamic(() => import('@dropgala/ui/components/PromoBanner'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  }),
  PromoBannerVertical: dynamic(
    () => import('@dropgala/ui/components/PromoBanner/PromoBannerVertical'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}

const modules = new Map<
  ModuleNames,
  { [key: string]: React.ComponentType<any> }
>()
modules.set(ModuleNames.HEADER, Header)
modules.set(ModuleNames.FOOTER, Footer)
modules.set(ModuleNames.MENU_DRAWER, MenuDrawer)
modules.set(ModuleNames.CART_DRAWER, CartDrawer)
modules.set(ModuleNames.HERO_BANNER, HeroBanner)
modules.set(ModuleNames.HOMEPAGE_CATEGORIES, HomepageCategories)
modules.set(ModuleNames.PRODUCT_CARD, ProductCard)
modules.set(ModuleNames.PRODUCT_DETAILS, ProductDetails)
modules.set(ModuleNames.LINKED_PRODUCTS, LinkedProducts)
modules.set(ModuleNames.CHECKOUT_BREADCRUMB, CheckoutBreadcrumb)
modules.set(ModuleNames.CHECKOUT_FOOTER, CheckoutFooter)
modules.set(ModuleNames.CHECKOUT_HEADER, CheckoutHeader)
modules.set(ModuleNames.BREADCRUMB, Breadcrumb)
modules.set(ModuleNames.CHECKOUT_CART_ITEMS, CheckoutCartItems)
modules.set(ModuleNames.ORDER_SUMMARY, OrderSummary)
modules.set(ModuleNames.CATEGORY_DETAILS, CategoryDetails)
modules.set(ModuleNames.CATEGORIES_LIST, CategoryList)
modules.set(ModuleNames.PAGINATION, Pagination)
modules.set(ModuleNames.MISCELLANEOUS, Miscellaneous)
modules.set(ModuleNames.PAGE_CMS, PageCms)
modules.set(ModuleNames.CHECKOUT_INFORMATION, CheckoutInformation)
modules.set(ModuleNames.CONFIRMATION_SUMMARY, ConfirmationSummary)
modules.set(ModuleNames.CHECKOUT_ITEMS, CheckoutItems)
modules.set(ModuleNames.CHECKOUT_SHIPPING, CheckoutShipping)
modules.set(ModuleNames.CHECKOUT_PAYMENT, CheckoutPayment)
modules.set(ModuleNames.INSTALL_PROMPT, InstallPrompt)
modules.set(ModuleNames.PRODUCT_NOT_FOUND, ProductNotFound)
modules.set(ModuleNames.PRODUCT_LIST_WIDGET, ProductListWidget)
modules.set(ModuleNames.COOKIE_POPUP, CookiePopup)
modules.set(ModuleNames.PROMO_BANNER, PromoBanner)

console.log('Factory module storage =', bytesToSize(modules))

interface Props {
  children?: React.ReactNode | React.ReactNode[] | Element | null
  [key: string]: any
}

export default function componentFactory(
  componentName: string | null,
  moduleName: ModuleNames,
  props: Props
): ReactElement<Props> | null {
  const components = modules.get(moduleName)
  if (isEmpty(components)) {
    console.warn(
      'Module ' +
        moduleName +
        ' cannot be found in componentFactory and skipped from render.'
    )
    return null
  }
  const Component = components[componentName ?? moduleName]
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
      {props?.children ?? null}
    </Component>
  )
}
