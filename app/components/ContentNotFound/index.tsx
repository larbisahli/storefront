import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ContentNotFound = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CONTENT_NOT_FOUND, props)

export default ContentNotFound
