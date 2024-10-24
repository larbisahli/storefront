/**
 * **** Generated file, Do Not Edit ****
 */
import { ModuleGroup } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { BlockPlaceholder } from '@dropgala/ui/placeholders'
import { bytesToSize } from 'utils'

const Header = {
  /* __DEFAULT__ */
  Header: dynamic(() => import('@dropgala/ui/components/Header'), {
    loading: () => (
      <BlockPlaceholder className="fixed top-0 desktop:h-[78px] h-[55px] w-full" />
    ),
    ssr: true
  }),
  HeaderElegant: dynamic(
    () => import('@dropgala/ui/components/Header/HeaderElegant'),
    {
      loading: () => (
        <BlockPlaceholder className="fixed top-0 desktop:h-[78px] h-[55px] w-full" />
      ),
      ssr: true
    }
  ),
  HeaderSatoshi: dynamic(
    () => import('@dropgala/ui/components/Header/HeaderSatoshi'),
    {
      loading: () => (
        <BlockPlaceholder className="fixed top-0 desktop:h-[78px] h-[55px] w-full" />
      ),
      ssr: true
    }
  )
}

const Footer = {
  /* __DEFAULT__ */
  Footer: dynamic(() => import('@dropgala/ui/components/Footer/Footer'), {
    loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
    ssr: true
  }),
  FooterLight: dynamic(
    () => import('@dropgala/ui/components/Footer/FooterLight'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  ),
  FooterSubscribe: dynamic(
    () => import('@dropgala/ui/components/Footer/FooterSubscribe'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  )
}

const MenuDrawer = {
  /* __DEFAULT__ */
  MenuDrawer: dynamic(() => import('@dropgala/ui/components/MenuDrawer'), {
    loading: () => <></>,
    ssr: false
  })
}

const CartDrawer = {
  /* __DEFAULT__ */
  CartDrawer: dynamic(() => import('@dropgala/ui/components/CartDrawer'), {
    loading: () => <></>,
    ssr: false
  })
}

const Carousel = {
  /* __DEFAULT__ */
  HeroCarousel: dynamic(
    () => import('@dropgala/ui/components/Carousel/HeroCarousel'),
    {
      loading: () => <BlockPlaceholder className="h-[400px] w-full" />,
      ssr: false
    }
  )
}
const ProductCard = {
  /* __DEFAULT__ */
  ProductCard: dynamic(() => import('@dropgala/ui/components/ProductCard'), {
    loading: () => <BlockPlaceholder className="h-[300px] w-[230px]" />,
    ssr: true
  })
}
const ProductDetails = {
  /* __DEFAULT__ */
  ProductDetails: dynamic(
    () => import('@dropgala/ui/components/ProductDetails'),
    {
      loading: () => <BlockPlaceholder className="h-[500px] w-full" />,
      ssr: true
    }
  )
}
const LinkedProducts = {
  /* __DEFAULT__ */
  LinkedProducts: dynamic(
    () => import('@dropgala/ui/components/LinkedProducts'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: false
    }
  )
}
const Breadcrumb = {
  /* __DEFAULT__ */
  Breadcrumb: dynamic(() => import('@dropgala/ui/components/Breadcrumb'), {
    loading: () => <BlockPlaceholder className="h-[20px] max-w-[250px]" />,
    ssr: false
  })
}
const CheckoutBreadcrumb = {
  /* __DEFAULT__ */
  CheckoutBreadcrumb: dynamic(
    () => import('@dropgala/ui/components/CheckoutBreadcrumb'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] max-w-[250px]" />,
      ssr: false
    }
  )
}
const CheckoutHeader = {
  /* __DEFAULT__ */
  CheckoutHeader: dynamic(
    () => import('@dropgala/ui/components/CheckoutHeader'),
    {
      loading: () => <BlockPlaceholder className="h-[55px] w-full" />,
      ssr: false
    }
  )
}
const CheckoutCartItems = {
  /* __DEFAULT__ */
  CheckoutCartItems: dynamic(
    () => import('@dropgala/ui/components/CheckoutCartItems'),
    {
      loading: () => <BlockPlaceholder className="h-[400px] w-[300px]" />,
      ssr: true
    }
  )
}
const OrderSummary = {
  /* __DEFAULT__ */
  OrderSummary: dynamic(() => import('@dropgala/ui/components/OrderSummary'), {
    loading: () => (
      <BlockPlaceholder className="h-[400px] w-[300px] bg-red-400" />
    ),
    ssr: true
  })
}
const CategoryDetails = {
  /* __DEFAULT__ */
  CategoryDetails: dynamic(
    () => import('@dropgala/ui/components/CategoryDetails'),
    {
      loading: () => <BlockPlaceholder className="h-[500px] w-full" />,
      ssr: true
    }
  )
}
const CategoryList = {
  /* __DEFAULT__ */
  CategoryList: dynamic(() => import('@dropgala/ui/components/CategoryList'), {
    loading: () => <BlockPlaceholder className="h-[500px] w-full" />,
    ssr: true
  }),
  CategoryListSlide: dynamic(
    () => import('@dropgala/ui/components/CategoryList/CategoryListSlide'),
    {
      loading: () => <BlockPlaceholder className="h-[500px] w-full" />,
      ssr: true
    }
  )
}
const CategoryListItem = {
  /* __DEFAULT__ */
  CategoryListItem1: dynamic(
    () => import('@dropgala/ui/components/CategoryListItem/CategoryListItem1'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-[250px]" />,
      ssr: true
    }
  ),
  CategoryListItem2: dynamic(
    () => import('@dropgala/ui/components/CategoryListItem/CategoryListItem2'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-[250px]" />,
      ssr: true
    }
  ),
  CategoryListItem3: dynamic(
    () => import('@dropgala/ui/components/CategoryListItem/CategoryListItem3'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-[250px]" />,
      ssr: true
    }
  )
}
const Pagination = {
  /* __DEFAULT__ */
  Pagination: dynamic(() => import('@dropgala/ui/components/Pagination'), {
    loading: () => <BlockPlaceholder className="h-[20px] w-[80px]" />,
    ssr: true
  })
}
const Miscellaneous = {
  /* __DEFAULT__ */
  Miscellaneous: dynamic(
    () => import('@dropgala/ui/components/Miscellaneous'),
    {
      loading: () => (
        <BlockPlaceholder className="h-[10px] w-[20px] bg-red-500" />
      ),
      ssr: true
    }
  )
}
const CheckoutInformation = {
  /* __DEFAULT__ */
  CheckoutInformation: dynamic(
    () => import('@dropgala/ui/components/CheckoutInformation'),
    {
      loading: () => <BlockPlaceholder className="h-[600px] w-[200px]" />,
      ssr: true
    }
  )
}
const CheckoutItems = {
  /* __DEFAULT__ */
  CheckoutItems: dynamic(
    () => import('@dropgala/ui/components/CheckoutItems'),
    {
      loading: () => (
        <BlockPlaceholder className="h-[30px] w-[100px] bg-red-200" />
      ),
      ssr: true
    }
  )
}
const CheckoutShipping = {
  /* __DEFAULT__ */
  CheckoutShipping: dynamic(
    () => import('@dropgala/ui/components/CheckoutShipping'),
    {
      loading: () => (
        <BlockPlaceholder className="h-[300px] w-[250px] bg-green-200" />
      ),
      ssr: true
    }
  )
}
const CheckoutPayment = {
  /* __DEFAULT__ */
  CheckoutPayment: dynamic(
    () => import('@dropgala/ui/components/CheckoutPayment'),
    {
      loading: () => (
        <BlockPlaceholder className="h-[300px] w-[250px] bg-blue-400" />
      ),
      ssr: true
    }
  )
}
const ConfirmationSummary = {
  /* __DEFAULT__ */
  ConfirmationSummary: dynamic(
    () => import('@dropgala/ui/components/ConfirmationSummary'),
    {
      loading: () => (
        <BlockPlaceholder className="h-[300px] w-[250px] bg-red-400" />
      ),
      ssr: true
    }
  )
}
const CheckoutFooter = {
  /* __DEFAULT__ */
  CheckoutFooter: dynamic(
    () => import('@dropgala/ui/components/CheckoutFooter'),
    {
      loading: () => <BlockPlaceholder className="h-[200px] w-full" />,
      ssr: true
    }
  )
}
const InstallPrompt = {
  /* __DEFAULT__ */
  InstallPrompt: dynamic(
    () => import('@dropgala/ui/components/InstallPrompt'),
    {
      loading: () => <BlockPlaceholder className="h-[200px] w-[300px]" />,
      ssr: true
    }
  )
}
const ContentNotFound = {
  /* __DEFAULT__ */
  ContentNotFound: dynamic(
    () => import('@dropgala/ui/components/ContentNotFound'),
    {
      loading: () => <BlockPlaceholder className="h-[100px] w-[250px]" />,
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
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  ),
  ProductListSlideWidget: dynamic(
    () =>
      import(
        '@dropgala/ui/components/ProductListWidget/ProductListSlideWidget'
      ),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  )
}
const ProductList = {
  /* __DEFAULT__ */
  ProductList: dynamic(() => import('@dropgala/ui/components/ProductList'), {
    loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
    ssr: true
  })
}
const CookiePopup = {
  /* __DEFAULT__ */
  CookiePopup: dynamic(() => import('@dropgala/ui/components/CookiePopup'), {
    loading: () => <BlockPlaceholder className="h-[200px] w-[300px]" />,
    ssr: true
  })
}
const OfflineNotice = {
  /* __DEFAULT__ */
  OfflineNotice: dynamic(
    () => import('@dropgala/ui/components/OfflineNotice'),
    {
      loading: () => (
        <BlockPlaceholder className="fixed bottom-0 h-[100px] w-full" />
      ),
      ssr: true
    }
  )
}
const PromoBanner = {
  /* __DEFAULT__ */
  PromoBanner: dynamic(() => import('@dropgala/ui/components/PromoBanner'), {
    loading: () => <BlockPlaceholder className="h-[50px] w-full" />,
    ssr: true
  })
}
const Subscription = {
  /* __DEFAULT__ */
  Subscription: dynamic(() => import('@dropgala/ui/components/Subscription'), {
    loading: () => <BlockPlaceholder className="h-[200px] w-[500px]" />,
    ssr: true
  })
}
const Text = {
  /* __DEFAULT__ */
  Text: dynamic(() => import('@dropgala/ui/components/Text'), {
    loading: () => <BlockPlaceholder className="h-[200px] w-full" />,
    ssr: true
  })
}
const Image = {
  /* __DEFAULT__ */
  Image: dynamic(() => import('@dropgala/ui/components/Image'), {
    loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
    ssr: true
  })
}
const ImageBanner = {
  /* __DEFAULT__ */
  ImageBannerContentCenter: dynamic(
    () =>
      import('@dropgala/ui/components/ImageBanner/ImageBannerContentCenter'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  ),
  ImageBannerHeadingCenter: dynamic(
    () =>
      import('@dropgala/ui/components/ImageBanner/ImageBannerHeadingCenter'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  ),
  ImageBannerHeadingLeft: dynamic(
    () => import('@dropgala/ui/components/ImageBanner/ImageBannerHeadingLeft'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  ),
  ImageBannerHeadingRight: dynamic(
    () => import('@dropgala/ui/components/ImageBanner/ImageBannerHeadingRight'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  ),
  ImageBannerStack: dynamic(
    () => import('@dropgala/ui/components/ImageBanner/ImageBannerStack'),
    {
      loading: () => <BlockPlaceholder className="h-[300px] w-full" />,
      ssr: true
    }
  )
}
const VideoBanner = {
  /* __DEFAULT__ */
  VideoBanner: dynamic(() => import('@dropgala/ui/components/VideoBanner'), {
    loading: () => <BlockPlaceholder className="h-[400px] w-full" />,
    ssr: true
  })
}
const Html = {
  /* __DEFAULT__ */
  Html: dynamic(() => import('@dropgala/ui/components/Html'), {
    loading: () => <BlockPlaceholder className="h-[200px] w-full" />,
    ssr: true
  })
}
const Spacer = {
  /* __DEFAULT__ */
  Spacer: dynamic(() => import('@dropgala/ui/components/Spacer'), {
    loading: () => <BlockPlaceholder className="h-[40px] w-full" />,
    ssr: true
  })
}
const Divider = {
  /* __DEFAULT__ */
  Divider: dynamic(() => import('@dropgala/ui/components/Divider'), {
    loading: () => <BlockPlaceholder className="h-[40px] w-full" />,
    ssr: true
  })
}
const Button = {
  /* __DEFAULT__ */
  ButtonPrimary: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonPrimary'),
    {
      loading: () => <BlockPlaceholder className="h-[30px] w-[50px]" />,
      ssr: true
    }
  ),
  ButtonOutline: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonOutline'),
    {
      loading: () => <BlockPlaceholder className="h-[30px] w-[50px]" />,
      ssr: true
    }
  ),
  ButtonPrimaryRounded: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonPrimaryRounded'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[50px]" />,
      ssr: true
    }
  ),
  ButtonOutlineRounded: dynamic(
    () => import('@dropgala/ui/components/Button/ButtonOutlineRounded'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[50px]" />,
      ssr: true
    }
  )
}
const EditorialText = {
  /* __DEFAULT__ */
  EditorialText: dynamic(
    () => import('@dropgala/ui/components/EditorialText'),
    {
      loading: () => <BlockPlaceholder className="h-[200px] w-full" />,
      ssr: true
    }
  )
}
const BannerWidget = {
  /* __DEFAULT__ */
  BannerWidgetBg: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetBg'),
    {
      loading: () => <BlockPlaceholder className="h-[100px] w-[200px]" />,
      ssr: true
    }
  ),
  BannerWidgetNoBg: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetNoBg'),
    {
      loading: () => <BlockPlaceholder className="h-[100px] w-[200px]" />,
      ssr: true
    }
  ),
  BannerWidgetBgCenter: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetBgCenter'),
    {
      loading: () => <BlockPlaceholder className="h-[100px] w-[200px]" />,
      ssr: true
    }
  ),
  BannerWidgetNoBgCenter: dynamic(
    () => import('@dropgala/ui/components/BannerWidget/BannerWidgetNoBgCenter'),
    {
      loading: () => <BlockPlaceholder className="h-[100px] w-[200px]" />,
      ssr: true
    }
  )
}
const Logo = {
  /* __DEFAULT__ */
  Logo: dynamic(() => import('@dropgala/ui/components/Logo'), {
    loading: () => <BlockPlaceholder className="h-[50px] w-[50px]" />,
    ssr: true
  })
}
const Search = {
  /* __DEFAULT__ */
  Search: dynamic(() => import('@dropgala/ui/components/Search'), {
    loading: () => <BlockPlaceholder className="h-[30px] w-[100px]" />,
    ssr: true
  })
}
const HeaderCtaContainer = {
  /* __DEFAULT__ */
  HeaderCtaContainer: dynamic(
    () => import('@dropgala/ui/components/HeaderCtaContainer'),
    {
      loading: () => <BlockPlaceholder className="h-[30px] w-full" />,
      ssr: true
    }
  )
}
const HeaderCtaItemCart = {
  /* __DEFAULT__ */
  HeaderCtaItemCart: dynamic(
    () => import('@dropgala/ui/plugins/HeaderCtaItemCart'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[20px]" />,
      ssr: true
    }
  )
}
const HeaderCtaItemLike = {
  /* __DEFAULT__ */
  HeaderCtaItemLike: dynamic(
    () => import('@dropgala/ui/plugins/HeaderCtaItemLike'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[20px]" />,
      ssr: true
    }
  )
}
const HeaderCtaItemUser = {
  /* __DEFAULT__ */
  HeaderCtaItemUser: dynamic(
    () => import('@dropgala/ui/plugins/HeaderCtaItemUser'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[20px]" />,
      ssr: true
    }
  )
}
const HeaderSelectionContainer = {
  /* __DEFAULT__ */
  HeaderSelectionContainer: dynamic(
    () => import('@dropgala/ui/components/HeaderSelectionContainer'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-full" />,
      ssr: true
    }
  )
}
const HeaderSelectionItemCurrency = {
  /* __DEFAULT__ */
  HeaderSelectionItemCurrency: dynamic(
    () => import('@dropgala/ui/plugins/HeaderSelectionItemCurrency'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[30px]" />,
      ssr: true
    }
  )
}
const HeaderSelectionItemLanguage = {
  /* __DEFAULT__ */
  HeaderSelectionItemLanguage: dynamic(
    () => import('@dropgala/ui/plugins/HeaderSelectionItemLanguage'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[30px]" />,
      ssr: true
    }
  )
}
const HeaderSelectionItemStoreInfo = {
  /* __DEFAULT__ */
  HeaderSelectionItemStoreInfo: dynamic(
    () => import('@dropgala/ui/plugins/HeaderSelectionItemStoreInfo'),
    {
      loading: () => <BlockPlaceholder className="h-[20px] w-[40px]" />,
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
modules.set(ModuleGroup.LOGO, Logo)
modules.set(ModuleGroup.SEARCH, Search)
modules.set(ModuleGroup.HEADER_CTA_CONTAINER, HeaderCtaContainer)
modules.set(ModuleGroup.HEADER_CTA_ITEM_CART, HeaderCtaItemCart)
modules.set(ModuleGroup.HEADER_CTA_ITEM_LIKE, HeaderCtaItemLike)
modules.set(ModuleGroup.HEADER_CTA_ITEM_USER, HeaderCtaItemUser)
modules.set(ModuleGroup.HEADER_SELECTION_CONTAINER, HeaderSelectionContainer)
modules.set(
  ModuleGroup.HEADER_SELECTION_ITEM_CURRENCY,
  HeaderSelectionItemCurrency
)
modules.set(
  ModuleGroup.HEADER_SELECTION_ITEM_LANGUAGE,
  HeaderSelectionItemLanguage
)
modules.set(
  ModuleGroup.HEADER_SELECTION_ITEM_STORE_INFO,
  HeaderSelectionItemStoreInfo
)

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
  if (!modules.has(moduleGroup)) {
    console.warn(
      'Module ' +
        moduleName +
        ' cannot be found in componentFactory and skipped from render.'
    )
    return null
  }
  const Component = components![moduleName ?? moduleGroup]
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
