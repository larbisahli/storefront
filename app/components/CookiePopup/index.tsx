import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CookiePopup = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.COOKIE_POPUP, props)

export default CookiePopup
