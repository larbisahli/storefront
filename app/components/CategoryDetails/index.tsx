import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const CategoryDetails = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CATEGORY_DETAILS, props)

export default CategoryDetails
