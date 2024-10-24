import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderSelectionContainer = (props: Props) =>
  componentFactory(
    props?.moduleName,
    ModuleGroup.HEADER_SELECTION_CONTAINER,
    props
  )

export default HeaderSelectionContainer
