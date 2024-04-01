import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const InstallPrompt = (props: any) =>
  componentFactory(ComponentNames.INSTALL_PROMPT, { ...props })

export default InstallPrompt
