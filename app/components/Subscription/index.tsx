import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Subscription = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.SUBSCRIPTION, props)

export default Subscription
