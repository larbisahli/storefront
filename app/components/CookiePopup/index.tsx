import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CookiePopup = (props: any) =>
  componentFactory(null, ModuleNames.COOKIE_POPUP, { ...props })

export default CookiePopup
