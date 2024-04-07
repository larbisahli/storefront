import { ModuleNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  category: CategoryType
}

const CategoryDetails = (props: any) =>
  componentFactory(null, ModuleNames.CATEGORY_DETAILS, { ...props })

export default CategoryDetails
