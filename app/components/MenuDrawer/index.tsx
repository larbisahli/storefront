import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const MenuDrawer = (props: Props) =>
  componentFactory('MenuDrawer', ModuleGroup.MENU_DRAWER, props)

export default MenuDrawer
