import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const InstallPrompt = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.INSTALL_PROMPT, props)

export default InstallPrompt
