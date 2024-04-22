import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Breadcrumb = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.BREADCRUMB, props)

export default Breadcrumb
