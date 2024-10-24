import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Logo = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.LOGO, props)

export default Logo
