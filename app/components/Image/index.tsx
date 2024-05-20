import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Image = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.IMAGE, props)

export default Image
