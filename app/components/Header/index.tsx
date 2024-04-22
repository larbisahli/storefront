import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Header = (props: Props) => {
  return componentFactory(props?.componentName, ModuleNames.HEADER, props)
}

export default Header
