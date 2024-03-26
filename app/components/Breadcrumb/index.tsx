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
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']
  return componentFactory(ComponentNames.BREADCRUMB, {
    name,
    breadcrumbs,
    data
  })
}

export default Breadcrumb
