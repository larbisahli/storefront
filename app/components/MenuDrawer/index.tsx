import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const MenuDrawer = (props: any) =>
  componentFactory(ComponentNames.MENU_DRAWER, { ...props })

export default MenuDrawer
