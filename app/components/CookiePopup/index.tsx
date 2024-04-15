import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CookiePopup = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.COOKIE_POPUP, { ...props })

export default CookiePopup
