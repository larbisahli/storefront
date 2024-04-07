import type {
  CategoryRefLevel2,
  CategoryRefLevel3,
  CategoryType
} from '@dropgala/types/category.type'
import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  categories: CategoryType[] | CategoryRefLevel2[] | CategoryRefLevel3[]
}

const CategoryList = (props: Props) =>
  componentFactory(null, ModuleNames.CATEGORIES_LIST, { ...props })

export default CategoryList
