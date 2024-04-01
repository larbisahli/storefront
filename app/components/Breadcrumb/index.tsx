import { ComponentNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  name?: string
  breadcrumbs: CategoryType['breadcrumbs']
}

const Breadcrumb = (props: Props) =>
  componentFactory(ComponentNames.BREADCRUMB, { ...props })

export default Breadcrumb
