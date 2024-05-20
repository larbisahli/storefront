import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Footer = (props: Props) => {
  return componentFactory(props?.moduleName, ModuleGroup.FOOTER, props)
}

export default Footer
