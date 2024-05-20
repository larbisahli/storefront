import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Divider = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.DIVIDER, props)

export default Divider
