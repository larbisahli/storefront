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
  ssr = false
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
      'MenuDrawerPlaceholder'
    )},
    CartDrawer: ${dynamicThemePath(
      themePath,
      'CartDrawer',
      'CartDrawerPlaceholder'
    )},
    HeroBanner: ${dynamicThemePath(
      themePath,
      'HeroBanner',
      'HeroBannerPlaceholder'
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
      'ProductCardPlaceholder'
    )},
    Breadcrumb: ${dynamicThemePath(
      themePath,
      'Breadcrumb',
      'ProductCardPlaceholder'
    )},
    CheckoutBreadcrumb: ${dynamicThemePath(
      themePath,
      'CheckoutBreadcrumb',
      'ProductCardPlaceholder'
    )},
    CheckoutHeader: ${dynamicThemePath(
      themePath,
      'CheckoutHeader',
      'ProductCardPlaceholder'
    )},
  }
  `
}

// Data generation
const content = `
/**
 * **** Generated file, Do Not Edit ****
 * This file was generated at the built time using 'app/scripts/packageManager.js'
*/
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
