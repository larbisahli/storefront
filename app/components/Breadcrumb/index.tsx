import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Breadcrumb = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.BREADCRUMB, props)

export default Breadcrumb
