import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CategoryList = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CATEGORY_LIST, props)

export default CategoryList
