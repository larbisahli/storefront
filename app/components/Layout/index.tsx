import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Layout = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.LAYOUT, props)

export default Layout
