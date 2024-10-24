import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderSelectionItemStoreInfo = (props: Props) =>
  componentFactory(
    props?.moduleName,
    ModuleGroup.HEADER_SELECTION_ITEM_STORE_INFO,
    props
  )

export default HeaderSelectionItemStoreInfo
