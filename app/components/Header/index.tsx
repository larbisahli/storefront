import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Header = ({ componentName, ...props }: Props) => {
  return componentFactory(componentName, ModuleNames.HEADER, { ...props })
}

export default Header
