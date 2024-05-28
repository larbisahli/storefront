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

const dynamicImport = (themePath, moduleName, placeholderName, ssr = true) => {
  return `
  dynamic(() => import('${themePath}/components/${moduleName}'), {
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
import { ModuleGroup, StoreThemes } from '@dropgala/types/enums.type'
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

const components = new Map<ModuleGroup, {[key in StoreThemes]: React.ComponentType<any>}>();
components.set(ModuleGroup.HEADER, Header);
components.set(ModuleGroup.FOOTER, Footer);
components.set(ModuleGroup.MENU_DRAWER, MenuDrawer);
components.set(ModuleGroup.CART_DRAWER, CartDrawer);
components.set(ModuleGroup.HERO_BANNER, HeroBanner);
components.set(ModuleGroup.PRODUCT_CARD, ProductCard);
components.set(ModuleGroup.PRODUCT_DETAILS, ProductDetails);
components.set(ModuleGroup.LINKED_PRODUCTS, LinkedProducts);
components.set(ModuleGroup.CHECKOUT_BREADCRUMB, CheckoutBreadcrumb);
components.set(ModuleGroup.CHECKOUT_FOOTER, CheckoutFooter);
components.set(ModuleGroup.CHECKOUT_HEADER, CheckoutHeader);
components.set(ModuleGroup.BREADCRUMB, Breadcrumb);
components.set(ModuleGroup.CHECKOUT_CART_ITEMS, CheckoutCartItems);
components.set(ModuleGroup.ORDER_SUMMARY, OrderSummary);
components.set(ModuleGroup.CATEGORY_DETAILS, CategoryDetails);
components.set(ModuleGroup.CATEGORY_LIST, CategoryList);
components.set(ModuleGroup.PAGINATION, Pagination);
components.set(ModuleGroup.MISCELLANEOUS, Miscellaneous);
components.set(ModuleGroup.CHECKOUT_INFORMATION, CheckoutInformation);
components.set(ModuleGroup.CONFIRMATION_SUMMARY, ConfirmationSummary)
components.set(ModuleGroup.CHECKOUT_ITEMS, CheckoutItems);
components.set(ModuleGroup.CHECKOUT_SHIPPING, CheckoutShipping);
components.set(ModuleGroup.CHECKOUT_PAYMENT, CheckoutPayment);
components.set(ModuleGroup.INSTALL_PROMPT, InstallPrompt);
components.set(ModuleGroup.PRODUCT_NOT_FOUND, ProductNotFound);
components.set(ModuleGroup.COOKIE_POPUP, CookiePopup);

export default function componentFactory<Props>(
  storeTheme: StoreThemes,
  componentName: ModuleGroup,
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
