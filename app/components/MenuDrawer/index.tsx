import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const MenuDrawer = (props: any) =>
  componentFactory(null, ModuleNames.MENU_DRAWER, { ...props })

export default MenuDrawer
