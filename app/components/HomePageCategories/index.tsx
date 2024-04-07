import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const HomepageCategories = (props: any) =>
  componentFactory(null, ModuleNames.HOMEPAGE_CATEGORIES, { ...props })
export default HomepageCategories
