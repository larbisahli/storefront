import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderCtaItemCart = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.HEADER_CTA_ITEM_CART, props)

export default HeaderCtaItemCart
