import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const ConfirmationSummary = (props: any) =>
  componentFactory(null, ModuleNames.CONFIRMATION_SUMMARY, { ...props })
export default ConfirmationSummary
