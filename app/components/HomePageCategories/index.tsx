import { selectConfig, selectMenu } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const HomePageCategories = () => {
  const { theme } = useAppSelector(selectConfig)
  const { homePageCategories } = useAppSelector(selectMenu)
  return componentFactory(theme, ComponentNames.HOMEPAGE_CATEGORIES, {
    categories: homePageCategories
  })
}

export default HomePageCategories
