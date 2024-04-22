import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Footer = (props: Props) => {
  return componentFactory(props?.componentName, ModuleNames.FOOTER, props)
}

export default Footer
