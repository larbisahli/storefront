import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Pagination = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.PAGINATION, props)
export default Pagination
