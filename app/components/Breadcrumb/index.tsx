import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  name?: string
  breadcrumbs: CategoryType['breadcrumbs']
}

const Breadcrumb = ({ name, breadcrumbs }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.BREADCRUMB, {
    name,
    breadcrumbs
  })
}

export default Breadcrumb
