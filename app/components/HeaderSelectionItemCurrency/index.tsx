import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderSelectionItemCurrency = (props: Props) =>
  componentFactory(
    props?.moduleName,
    ModuleGroup.HEADER_SELECTION_ITEM_CURRENCY,
    props
  )

export default HeaderSelectionItemCurrency
