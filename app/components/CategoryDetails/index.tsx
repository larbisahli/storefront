import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CategoryDetails = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.CATEGORY_DETAILS, { ...props })

export default CategoryDetails
