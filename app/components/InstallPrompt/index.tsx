import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const InstallPrompt = () => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.INSTALL_PROMPT, {})
}

export default InstallPrompt
