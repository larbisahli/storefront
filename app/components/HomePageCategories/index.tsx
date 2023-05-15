import { selectConfig } from '@dropgala/store'
import type { CategoryType } from '@dropgala/types/category.type'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  menu: CategoryType[]
}

const HomePageCategories = ({ menu }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.HOMEPAGE_CATEGORIES, {
    categories: menu
  })
}

export default HomePageCategories
