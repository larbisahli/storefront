import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const HomepageCategories = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.HOMEPAGE_CATEGORIES, props)
export default HomepageCategories
