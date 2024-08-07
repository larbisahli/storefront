/**
 * **** Generated file, Do Not Edit ****
 */
import { ModuleGroup } from '@dropgala/types/enums.type'
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
} from '@dropgala/assets/placeholders'
import { bytesToSize } from 'utils'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

const Header = {
  /* __DEFAULT__ */
  Header: dynamic(() => import('@dropgala/ui/components/Header'), {
    loading: () => <HeaderPlaceholder />,
    ssr: true
  })
  // HeaderComponent1
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

const Carousel = {
  /* __DEFAULT__ */
  HeroCarousel: dynamic(
    () => import('@dropgala/ui/components/Carousel/HeroCarousel'),
    {
      loading: () => <HeroBannerPlaceholder />,
      ssr: false
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
  }),
  CategoryListSlide: dynamic(
    () => import('@dropgala/ui/components/CategoryList/CategoryListSlide'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const CategoryListItem = {
  /* __DEFAULT__ */
  CategoryListItem1: dynamic(
    () => import('@dropgala/ui/components/CategoryListItem/CategoryListItem1'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  CategoryListItem2: dynamic(
    () => import('@dropgala/ui/components/CategoryListItem/CategoryListItem2'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  CategoryListItem3: dynamic(
    () => import('@dropgala/ui/components/CategoryListItem/CategoryListItem3'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
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
const ContentNotFound = {
  /* __DEFAULT__ */
  ContentNotFound: dynamic(
    () => import('@dropgala/ui/components/ContentNotFound'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const ProductListWidget = {
  /* __DEFAULT__ */
  ProductListGridWidget: dynamic(
    () =>
      import('@dropgala/ui/components/ProductListWidget/ProductListGridWidget'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ProductListSlideWidget: dynamic(
    () =>
      import(
        '@dropgala/ui/components/ProductListWidget/ProductListSlideWidget'
      ),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const ProductList = {
  /* __DEFAULT__ */
  ProductList: dynamic(() => import('@dropgala/ui/components/ProductList'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const CookiePopup = {
  /* __DEFAULT__ */
  CookiePopup: dynamic(() => import('@dropgala/ui/components/CookiePopup'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const OfflineNotice = {
  /* __DEFAULT__ */
  OfflineNotice: dynamic(
    () => import('@dropgala/ui/components/OfflineNotice'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const PromoBanner = {
  /* __DEFAULT__ */
  PromoBanner: dynamic(() => import('@dropgala/ui/components/PromoBanner'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Subscription = {
  /* __DEFAULT__ */
  Subscription: dynamic(() => import('@dropgala/ui/components/Subscription'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Text = {
  /* __DEFAULT__ */
  Text: dynamic(() => import('@dropgala/ui/components/Text'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Image = {
  /* __DEFAULT__ */
  Image: dynamic(() => import('@dropgala/ui/components/Image'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const ImageBanner = {
  /* __DEFAULT__ */
  ImageBannerContentCenter: dynamic(
    () =>
      import('@dropgala/ui/components/ImageBanner/ImageBannerContentCenter'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ImageBannerHeadingCenter: dynamic(
    () =>
      import('@dropgala/ui/components/ImageBanner/ImageBannerHeadingCenter'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ImageBannerHeadingLeft: dynamic(
    () => import('@dropgala/ui/components/ImageBanner/ImageBannerHeadingLeft'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ImageBannerHeadingRight: dynamic(
    () => import('@dropgala/ui/components/ImageBanner/ImageBannerHeadingRight'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ImageBannerStack: dynamic(
    () => import('@dropgala/ui/components/ImageBanner/ImageBannerStack'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const VideoBanner = {
  /* __DEFAULT__ */
  VideoBanner: dynamic(() => import('@dropgala/ui/components/VideoBanner'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Html = {
  /* __DEFAULT__ */
  Html: dynamic(() => import('@dropgala/ui/components/Html'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Spacer = {
  /* __DEFAULT__ */
  Spacer: dynamic(() => import('@dropgala/ui/components/Spacer'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Divider = {
  /* __DEFAULT__ */
  Divider: dynamic(() => import('@dropgala/ui/components/Divider'), {
    loading: () => <ProductCardPlaceholder />,
    ssr: true
  })
}
const Button = {
  /* __DEFAULT__ */
  ButtonPrimary: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonPrimary'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ButtonOutline: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonOutline'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ButtonPrimaryRounded: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonPrimaryRounded'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  ButtonOutlineRounded: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonOutlineRounded'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const EditorialText = {
  /* __DEFAULT__ */
  EditorialText: dynamic(
    () => import('@dropgala/ui/components/EditorialText'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}
const BannerWidget = {
  /* __DEFAULT__ */
  BannerWidgetBg: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetBg'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  BannerWidgetNoBg: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetNoBg'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  BannerWidgetBgCenter: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetBgCenter'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  ),
  BannerWidgetNoBgCenter: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetNoBgCenter'),
    {
      loading: () => <ProductCardPlaceholder />,
      ssr: true
    }
  )
}

const modules = new Map<
  ModuleGroup,
  { [key: string]: React.ComponentType<any> }
>()
modules.set(ModuleGroup.HEADER, Header)
modules.set(ModuleGroup.FOOTER, Footer)
modules.set(ModuleGroup.MENU_DRAWER, MenuDrawer)
modules.set(ModuleGroup.CART_DRAWER, CartDrawer)
modules.set(ModuleGroup.CAROUSEL, Carousel)
modules.set(ModuleGroup.PRODUCT_CARD, ProductCard)
modules.set(ModuleGroup.PRODUCT_DETAILS, ProductDetails)
modules.set(ModuleGroup.LINKED_PRODUCTS, LinkedProducts)
modules.set(ModuleGroup.CHECKOUT_BREADCRUMB, CheckoutBreadcrumb)
modules.set(ModuleGroup.CHECKOUT_FOOTER, CheckoutFooter)
modules.set(ModuleGroup.CHECKOUT_HEADER, CheckoutHeader)
modules.set(ModuleGroup.BREADCRUMB, Breadcrumb)
modules.set(ModuleGroup.CHECKOUT_CART_ITEMS, CheckoutCartItems)
modules.set(ModuleGroup.ORDER_SUMMARY, OrderSummary)
modules.set(ModuleGroup.CATEGORY_DETAILS, CategoryDetails)
modules.set(ModuleGroup.CATEGORY_LIST, CategoryList)
modules.set(ModuleGroup.PAGINATION, Pagination)
modules.set(ModuleGroup.MISCELLANEOUS, Miscellaneous)
modules.set(ModuleGroup.CHECKOUT_INFORMATION, CheckoutInformation)
modules.set(ModuleGroup.CONFIRMATION_SUMMARY, ConfirmationSummary)
modules.set(ModuleGroup.CHECKOUT_ITEMS, CheckoutItems)
modules.set(ModuleGroup.CHECKOUT_SHIPPING, CheckoutShipping)
modules.set(ModuleGroup.CHECKOUT_PAYMENT, CheckoutPayment)
modules.set(ModuleGroup.INSTALL_PROMPT, InstallPrompt)
modules.set(ModuleGroup.CONTENT_NOT_FOUND, ContentNotFound)
modules.set(ModuleGroup.PRODUCT_LIST, ProductList)
modules.set(ModuleGroup.PRODUCT_LIST_WIDGET, ProductListWidget)
modules.set(ModuleGroup.COOKIE_POPUP, CookiePopup)
modules.set(ModuleGroup.PROMO_BANNER, PromoBanner)
modules.set(ModuleGroup.OFFLINE_NOTICE, OfflineNotice)
modules.set(ModuleGroup.SUBSCRIPTION, Subscription)
modules.set(ModuleGroup.TEXT, Text)
modules.set(ModuleGroup.IMAGE, Image)
modules.set(ModuleGroup.IMAGE_BANNER, ImageBanner)
modules.set(ModuleGroup.VIDEO_BANNER, VideoBanner)
modules.set(ModuleGroup.HTML, Html)
modules.set(ModuleGroup.SPACER, Spacer)
modules.set(ModuleGroup.DIVIDER, Divider)
modules.set(ModuleGroup.BUTTON, Button)
modules.set(ModuleGroup.EDITORIAL_TEXT, EditorialText)
modules.set(ModuleGroup.BANNER_WIDGET, BannerWidget)
modules.set(ModuleGroup.CATEGORY_LIST_ITEM, CategoryListItem)

interface Props {
  children?: React.ReactNode | React.ReactNode[] | Element | null
  [key: string]: any
}

export default function componentFactory(
  moduleName: string | null,
  moduleGroup: ModuleGroup,
  props: Props
): ReactElement<Props> | null {
  const components = modules.get(moduleGroup)
  if (isEmpty(components)) {
    console.warn(
      'Module ' +
        moduleName +
        ' cannot be found in componentFactory and skipped from render.'
    )
    return null
  }
  const Component = components[moduleName ?? moduleGroup]
  if (!Component) {
    console.warn(
      'Component ' +
        moduleName +
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

console.table({
  'Factory modules storage': bytesToSize(modules),
  'Factory modules count': Array.from(modules.keys())
    .map((module) => Object.keys(modules.get(module)!).length)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
})
