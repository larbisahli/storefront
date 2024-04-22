import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CategoryList = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CATEGORIES_LIST, props)

export default CategoryList
