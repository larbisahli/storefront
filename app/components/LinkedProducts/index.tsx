import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const LinkedProducts = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.LINKED_PRODUCTS, props)

export default LinkedProducts
