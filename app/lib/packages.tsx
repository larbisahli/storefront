import { FooterPlaceholder, HeaderPlaceholder } from '@components'
import { StoreThemes } from '@dropgala/types/custom.type'
import { ComponentNames } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const dynamicComponents = {
  '@dropgala/luma': {
    Header: dynamic(() => import('@dropgala/luma/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: false
    }),
    Footer: dynamic(() => import('@dropgala/luma/Footer'), {
      loading: () => <FooterPlaceholder />,
      ssr: false
    })
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
