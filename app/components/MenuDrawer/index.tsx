import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const MenuDrawer = (props: Props) =>
  componentFactory('MenuDrawer', ModuleNames.MENU_DRAWER, props)

export default MenuDrawer
