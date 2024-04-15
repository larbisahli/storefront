import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CategoryList = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.CATEGORIES_LIST, { ...props })

export default CategoryList
