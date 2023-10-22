import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import type { CategoryType } from '@dropgala/types/category.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  category: CategoryType
}

const CategoryDetails = ({ category }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CATEGORY_DETAILS, {
    category
  })
}

export default CategoryDetails
