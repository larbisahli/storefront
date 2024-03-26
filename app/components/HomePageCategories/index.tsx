import { selectConfig, selectMenu } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const HomePageCategories = () => {
  const { homePageCategories } = useAppSelector(selectMenu)
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']
  return componentFactory(ComponentNames.HOMEPAGE_CATEGORIES, {
    categories: homePageCategories,
    data
  })
}

export default HomePageCategories
