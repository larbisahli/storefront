import {
  CartDrawerPlaceholder,
  FooterPlaceholder,
  HeaderPlaceholder,
  HeroBannerPlaceholder,
  MenuDrawerPlaceholder
} from '@components/placeholders'
import { StoreThemes } from '@dropgala/types/enums.type'
import { ComponentNames } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'

const dynamicComponents = {
  '@dropgala/luma': {
    Header: dynamic(() => import('@dropgala/luma/components/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: false
    }),
    Footer: dynamic(() => import('@dropgala/luma/components/Footer'), {
      loading: () => <FooterPlaceholder />,
      ssr: false
    }),
    MenuDrawerView: dynamic(
      () => import('@dropgala/luma/components/Drawer/MenuDrawerView'),
      {
        loading: () => <MenuDrawerPlaceholder />,
        ssr: false
      }
    ),
    CartDrawerView: dynamic(
      () => import('@dropgala/luma/components/Drawer/CartDrawerView'),
      {
        loading: () => <CartDrawerPlaceholder />,
        ssr: false
      }
    ),
    Slider: dynamic(
      () => import('@dropgala/luma/components/banner/HeroBlock'),
      {
        loading: () => <HeroBannerPlaceholder />,
        ssr: false
      }
    )
  }
}

export function renderComponent<Props>(
  storeTheme: StoreThemes,
  componentName: ComponentNames,
  props: Props,
  children?: () => React.ReactNode | React.ReactNode[] | null
): ReactElement<Props, any> | null {
  const Component = dynamicComponents[storeTheme][componentName]

  if (Component) {
    // @ts-ignore
    return <Component {...props}>{children?.()}</Component>
  }

  return null
}

export default dynamicComponents
