import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Subscription = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.SUBSCRIPTION, props)

export default Subscription
