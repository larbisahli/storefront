import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderSelectionItemLanguage = (props: Props) =>
  componentFactory(
    props?.moduleName,
    ModuleGroup.HEADER_SELECTION_ITEM_LANGUAGE,
    props
  )

export default HeaderSelectionItemLanguage
