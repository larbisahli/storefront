import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CategoryDetails = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.CATEGORY_DETAILS, props)

export default CategoryDetails
