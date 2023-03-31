import { HeaderPlaceholder } from '@components'
import { StoreThemes } from '@ts-types/custom'
import { ComponentNames } from '@ts-types/enums'
import dynamic from 'next/dynamic'
import { ComponentType, FC, ReactElement } from 'react'

const dynamicComponents = {
  '@dropgala/luma': {
    Header: dynamic(() => import('@dropgala/luma/Header'), {
      loading: () => <HeaderPlaceholder />,
      ssr: false,
    }),
    Footer: dynamic(() => import('@dropgala/luma/Footer'), {
      loading: () => <HeaderPlaceholder />,
      ssr: false,
    }),
  },
}

export function renderComponent<Props>(
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
