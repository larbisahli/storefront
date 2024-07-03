import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CategoryListItem = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CATEGORY_LIST_ITEM, props)

export default CategoryListItem
