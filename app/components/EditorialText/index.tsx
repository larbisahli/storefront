import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const EditorialText = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.EDITORIAL_TEXT, props)

export default EditorialText
