import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Text = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.TEXT, props)

export default Text
