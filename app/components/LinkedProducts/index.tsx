import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const LinkedProducts = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.LINKED_PRODUCTS, props)

export default LinkedProducts
