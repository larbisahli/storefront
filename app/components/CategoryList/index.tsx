import { selectConfig } from '@dropgala/store'
import type {
  CategoryRefLevel2,
  CategoryRefLevel3,
  CategoryType
} from '@dropgala/types/category.type'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  categories: CategoryType[] | CategoryRefLevel2[] | CategoryRefLevel3[]
}

const CategoryList = ({ categories }: Props) => {
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']

  return componentFactory(ComponentNames.CATEGORIES_LIST, {
    categories,
    data
  })
}

export default CategoryList
