import { BreadcrumbComponents } from '@dropgala/types/enums.type'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { BreadcrumbPlaceholder } from '@dropgala/placeholder'

const Breadcrumb = dynamic(() => import('./Breadcrumb'), {
  loading: () => <BreadcrumbPlaceholder />,
  ssr: true
})

const components = new Map<BreadcrumbComponents, React.ComponentType<any>>()

components.set(BreadcrumbComponents.BREADCRUMB, Breadcrumb)

export default function breadcrumbFactory<Props>(
  componentName: BreadcrumbComponents,
  props: Props,
  children?: (
    props: any
  ) => React.ReactNode | React.ReactNode[] | Element | null
): ReactElement<Props> | null {
  const Component = components.get(componentName)
  if (isEmpty(Component)) {
    console.warn(
      'Component ' +
        componentName +
        ' cannot be found in BreadcrumbFactory and skipped from render.'
    )
    return null
  }
  return <Component {...props}>{children ?? null}</Component>
}
