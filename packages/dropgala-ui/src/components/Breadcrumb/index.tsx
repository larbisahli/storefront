import { BreadcrumbComponents, GalaCoreComponentType } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import breadcrumbFactory from './factory'

interface Props {
  name?: string
  breadcrumbs: CategoryType['breadcrumbs']
  data: GalaCoreComponentType
}

const Breadcrumb = (props: Props) => {
  const componentName = BreadcrumbComponents.BREADCRUMB
  return breadcrumbFactory(componentName, { ...props })
}

export default Breadcrumb
