import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const ConfirmationSummary = (props: any) =>
  componentFactory(ComponentNames.CONFIRMATION_SUMMARY, { ...props })
export default ConfirmationSummary
