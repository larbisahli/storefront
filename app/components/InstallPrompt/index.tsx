import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const InstallPrompt = (props: any) =>
  componentFactory(null, ModuleNames.INSTALL_PROMPT, { ...props })

export default InstallPrompt
