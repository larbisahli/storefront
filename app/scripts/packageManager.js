const fs = require('fs')
const prettier = require('prettier')
const enums = require('@dropgala/types/enums.type')

const prettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'always'
}

// Configuration
const outputFile = 'app/lib/generated.tsx'

const themePaths = Object.values(enums.StoreThemes)

const dynamicImport = (
  themePath,
  componentName,
  placeholderName,
  ssr = true
) => {
  return `
  dynamic(() => import('${themePath}/components/${componentName}'), {
    loading: () => <${placeholderName} />,
    ssr: ${ssr}
  })
  `
}

// Data generation
const content = `
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
import { ModuleNames, StoreThemes } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'

const Header = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'Header',
      'HeaderPlaceholder'
    )}`
)}}
const Footer = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'Footer',
      'FooterPlaceholder'
    )}`
)}}
const MenuDrawer = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'MenuDrawer',
      'MenuDrawerPlaceholder',
      false
    )}`
)}}
const CartDrawer = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CartDrawer',
      'CartDrawerPlaceholder',
      false
    )}`
)}}
const HeroBanner = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'HeroBanner',
      'HeroBannerPlaceholder',
      false
    )}`
)}}
const HomepageCategories = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'HomepageCategories',
      'HeroBannerPlaceholder'
    )}`
)}}
const ProductCard = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'ProductCard',
      'ProductCardPlaceholder'
    )}`
)}}
const ProductDetails = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'ProductDetails',
      'ProductCardPlaceholder'
    )}`
)}}
const LinkedProducts = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'LinkedProducts',
      'ProductCardPlaceholder',
      false
    )}`
)}}
const Breadcrumb = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'Breadcrumb',
      'BreadcrumbPlaceholder',
      false
    )}`
)}}
const CheckoutBreadcrumb = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutBreadcrumb',
      'BreadcrumbPlaceholder',
      false
    )}`
)}}
const CheckoutHeader = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutHeader',
      'ProductCardPlaceholder',
      false
    )}`
)}}
const CheckoutCartItems = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutCartItems',
      'ProductCardPlaceholder'
    )}`
)}}
const OrderSummary = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'OrderSummary',
      'ProductCardPlaceholder'
    )}`
)}}
const CategoryDetails = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CategoryDetails',
      'ProductCardPlaceholder'
    )}`
)}}
const CategoryList = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CategoryList',
      'ProductCardPlaceholder'
    )}`
)}}
const Pagination = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'Pagination',
      'ProductCardPlaceholder'
    )}`
)}}
const Miscellaneous = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'Miscellaneous',
      'ProductCardPlaceholder'
    )}`
)}}
const PageCms = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'PageCms',
      'ProductCardPlaceholder'
    )}`
)}}
const CheckoutInformation = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutInformation',
      'ProductCardPlaceholder'
    )}`
)}}
const CheckoutItems = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutItems',
      'ProductCardPlaceholder'
    )}`
)}}
const CheckoutShipping = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutShipping',
      'ProductCardPlaceholder'
    )}`
)}}
const CheckoutPayment = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutPayment',
      'ProductCardPlaceholder'
    )}`
)}}
const ConfirmationSummary = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'ConfirmationSummary',
      'ProductCardPlaceholder'
    )}`
)}}
const CheckoutFooter = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CheckoutFooter',
      'ProductCardPlaceholder'
    )}`
)}}
const InstallPrompt = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'InstallPrompt',
      'ProductCardPlaceholder'
    )}`
)}}
const ProductNotFound = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'ProductNotFound',
      'ProductCardPlaceholder'
    )}`
)}}
const CookiePopup = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'CookiePopup',
      'ProductCardPlaceholder'
    )}`
)}}
const PromoSlider = {${themePaths?.map(
  (themePath) =>
    `'${[themePath]}': ${dynamicImport(
      themePath,
      'PromoSlider',
      'ProductCardPlaceholder'
    )}`
)}}

const components = new Map<ModuleNames, {[key in StoreThemes]: React.ComponentType<any>}>();
components.set(ModuleNames.HEADER, Header);
components.set(ModuleNames.FOOTER, Footer);
components.set(ModuleNames.MENU_DRAWER, MenuDrawer);
components.set(ModuleNames.CART_DRAWER, CartDrawer);
components.set(ModuleNames.HERO_BANNER, HeroBanner);
components.set(ModuleNames.HOMEPAGE_CATEGORIES, HomepageCategories);
components.set(ModuleNames.PRODUCT_CARD, ProductCard);
components.set(ModuleNames.PRODUCT_DETAILS, ProductDetails);
components.set(ModuleNames.LINKED_PRODUCTS, LinkedProducts);
components.set(ModuleNames.CHECKOUT_BREADCRUMB, CheckoutBreadcrumb);
components.set(ModuleNames.CHECKOUT_FOOTER, CheckoutFooter);
components.set(ModuleNames.CHECKOUT_HEADER, CheckoutHeader);
components.set(ModuleNames.BREADCRUMB, Breadcrumb);
components.set(ModuleNames.CHECKOUT_CART_ITEMS, CheckoutCartItems);
components.set(ModuleNames.ORDER_SUMMARY, OrderSummary);
components.set(ModuleNames.CATEGORY_DETAILS, CategoryDetails);
components.set(ModuleNames.CATEGORIES_LIST, CategoryList);
components.set(ModuleNames.PAGINATION, Pagination);
components.set(ModuleNames.MISCELLANEOUS, Miscellaneous);
components.set(ModuleNames.PAGE_CMS, PageCms);
components.set(ModuleNames.CHECKOUT_INFORMATION, CheckoutInformation);
components.set(ModuleNames.CONFIRMATION_SUMMARY, ConfirmationSummary)
components.set(ModuleNames.CHECKOUT_ITEMS, CheckoutItems);
components.set(ModuleNames.CHECKOUT_SHIPPING, CheckoutShipping);
components.set(ModuleNames.CHECKOUT_PAYMENT, CheckoutPayment);
components.set(ModuleNames.INSTALL_PROMPT, InstallPrompt);
components.set(ModuleNames.PRODUCT_NOT_FOUND, ProductNotFound);
components.set(ModuleNames.COOKIE_POPUP, CookiePopup);
components.set(ModuleNames.PROMO_SLIDER, PromoSlider);

export default function componentFactory<Props>(
  storeTheme: StoreThemes,
  componentName: ModuleNames,
  props: Props,
  children?:(
    props: any
  ) => React.ReactNode | React.ReactNode[] | Element | null
): ReactElement<Props> | null {
  const modules = components.get(componentName)
  if(isEmpty(modules)){
    console.warn('Component ' + componentName + ' cannot be found in componentFactory and skipped from render.');
    return null
  }
  const Component = modules[storeTheme]
  if (!Component) {
    console.warn('Theme ' + storeTheme + ' cannot be found in componentFactory and skipped from render.');
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
`

// File writing
try {
  fs.writeFileSync(
    outputFile,
    prettier.format(content, { ...prettierConfig, filepath: outputFile })
  )
  console.log(
    `===============> Packages File was written successfully to ${outputFile}`
  )
} catch (error) {
  console.log(error)
  console.error(`Failed to write packages file: ${(error, __dirname)}`)
}
