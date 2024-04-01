import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const CookiePopup = (props: any) =>
  componentFactory(ComponentNames.COOKIE_POPUP, { ...props })

export default CookiePopup
