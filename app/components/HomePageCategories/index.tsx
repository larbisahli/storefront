import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const HomePageCategories = (props: any) =>
  componentFactory(ComponentNames.HOMEPAGE_CATEGORIES, { ...props })
export default HomePageCategories
