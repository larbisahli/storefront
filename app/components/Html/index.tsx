import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Html = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.HTML, props)

export default Html
