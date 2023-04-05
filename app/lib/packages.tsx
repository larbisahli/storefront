import { FooterPlaceholder, HeaderPlaceholder } from '@components'
import CartDrawerPlaceholder from '@components/placeholders/Drawers/CartDrawer'
import MenuDrawerPlaceholder from '@components/placeholders/Drawers/MenuDrawer'
import { StoreThemes } from '@dropgala/types/custom.type'
import { ComponentNames } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

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
    )
  }
}

export function renderComponent<Props extends JSX.IntrinsicAttributes>(
  storeTheme: StoreThemes,
  componentName: ComponentNames,
  props: Props
): ReactElement<Props, any> | null {
  const Component = dynamicComponents[storeTheme][componentName]

  if (Component) {
    return <Component {...props} />
  }

  return null
}

export default dynamicComponents
