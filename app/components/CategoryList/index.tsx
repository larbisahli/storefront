import { selectConfig } from '@dropgala/store'
import type {
  CategoryRefLevel2,
  CategoryRefLevel3,
  CategoryType
} from '@dropgala/types/category.type'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  categories: CategoryType[] | CategoryRefLevel2[] | CategoryRefLevel3[]
}

const CategoryList = ({ categories }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.CATEGORIES_LIST, {
    categories
  })
}

export default CategoryList
