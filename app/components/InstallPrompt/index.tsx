import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const InstallPrompt = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.INSTALL_PROMPT, props)

export default InstallPrompt
