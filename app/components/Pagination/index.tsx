import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Pagination = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.PAGINATION, props)
export default Pagination
