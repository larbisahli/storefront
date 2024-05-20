import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Spacer = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.SPACER, props)

export default Spacer
