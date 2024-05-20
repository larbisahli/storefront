import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Miscellaneous = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.MISCELLANEOUS, props)

export default Miscellaneous
