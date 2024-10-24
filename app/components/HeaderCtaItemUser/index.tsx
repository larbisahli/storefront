import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderCtaItemUser = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.HEADER_CTA_ITEM_USER, props)

export default HeaderCtaItemUser
