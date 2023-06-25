const fs = require('fs')
const prettier = require('prettier')
const deps = require('../package.json').dependencies

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
const outputFile = 'app/lib/packages.tsx'

const packagesBlacklist = [
  '@dropgala/query',
  '@dropgala/store',
  '@dropgala/types',
  '@dropgala/utils'
]

const themePaths = Object.keys(deps)
  ?.filter((v) => v.startsWith('@dropgala/'))
  ?.filter((v) => !packagesBlacklist.includes(v))

const dynamicThemePath = (
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

const ComponentsMapping = (themePath) => {
  return `
  {
    Header: ${dynamicThemePath(themePath, 'Header', 'HeaderPlaceholder')},
    Footer: ${dynamicThemePath(themePath, 'Footer', 'FooterPlaceholder')},
    MenuDrawer: ${dynamicThemePath(
      themePath,
      'MenuDrawer',
      'MenuDrawerPlaceholder',
      false
    )},
    CartDrawer: ${dynamicThemePath(
      themePath,
      'CartDrawer',
      'CartDrawerPlaceholder',
      false
    )},
    HeroBanner: ${dynamicThemePath(
      themePath,
      'HeroBanner',
      'HeroBannerPlaceholder',
      false
    )},
    HomePageCategories: ${dynamicThemePath(
      themePath,
      'HomepageCategories',
      'HeroBannerPlaceholder'
    )},
    ProductCard: ${dynamicThemePath(
      themePath,
      'ProductCard',
      'ProductCardPlaceholder'
    )},
    ProductDetails: ${dynamicThemePath(
      themePath,
      'ProductDetails',
      'ProductCardPlaceholder'
    )},
    LinkedProducts: ${dynamicThemePath(
      themePath,
      'LinkedProducts',
      'ProductCardPlaceholder',
      false
    )},
    Breadcrumb: ${dynamicThemePath(
      themePath,
      'Breadcrumb',
      'BreadcrumbPlaceholder',
      false
    )},
    CheckoutBreadcrumb: ${dynamicThemePath(
      themePath,
      'CheckoutBreadcrumb',
      'BreadcrumbPlaceholder',
      false
    )},
    CheckoutHeader: ${dynamicThemePath(
      themePath,
      'CheckoutHeader',
      'ProductCardPlaceholder',
      false
    )},
    CheckoutCartItems: ${dynamicThemePath(
      themePath,
      'CheckoutCartItems',
      'ProductCardPlaceholder'
    )},
    OrderSummary: ${dynamicThemePath(
      themePath,
      'OrderSummary',
      'ProductCardPlaceholder'
    )},
    CategoryDetails: ${dynamicThemePath(
      themePath,
      'CategoryDetails',
      'ProductCardPlaceholder'
    )},
    CategoryList: ${dynamicThemePath(
      themePath,
      'CategoryList',
      'ProductCardPlaceholder'
    )},
    Pagination: ${dynamicThemePath(
      themePath,
      'Pagination',
      'ProductCardPlaceholder',
      false
    )},
    Miscellaneous: ${dynamicThemePath(
      themePath,
      'Miscellaneous',
      'ProductCardPlaceholder'
    )},
    PageCms: ${dynamicThemePath(
      themePath,
      'PageCms',
      'ProductCardPlaceholder'
    )},
  }
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
import type { ComponentNames, StoreThemes } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'

export const mapDynamicComponents = {${themePaths?.map(
  (themePath) => `'${[themePath]}': ${ComponentsMapping(themePath)}`
)}};

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
  console.error(`Failed to write packages file: ${(error, __dirname)}`)
}
