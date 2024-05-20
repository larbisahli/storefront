import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Header = (props: Props) => {
  return componentFactory(props?.moduleName, ModuleGroup.HEADER, props)
}

export default Header
