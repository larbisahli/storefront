import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Button = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.BUTTON, props)

export default Button
