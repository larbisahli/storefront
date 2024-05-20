import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HomepageCategories = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.HOMEPAGE_CATEGORIES, props)
export default HomepageCategories
