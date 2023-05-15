import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { CategoryType } from '@dropgala/types/category.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  name: string
  category: CategoryType
}

const Breadcrumb = ({ name, category }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.BREADCRUMB, {
    name,
    category
  })
}

export default Breadcrumb
