import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const ConfirmationSummary = (props: Props) =>
  componentFactory(
    props?.componentName,
    ModuleNames.CONFIRMATION_SUMMARY,
    props
  )
export default ConfirmationSummary
