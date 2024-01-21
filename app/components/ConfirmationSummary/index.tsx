import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const ConfirmationSummary = () => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.CONFIRMATION_SUMMARY, {})
}

export default ConfirmationSummary
