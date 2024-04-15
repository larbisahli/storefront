import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const LinkedProducts = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.LINKED_PRODUCTS, { ...props })

export default LinkedProducts
