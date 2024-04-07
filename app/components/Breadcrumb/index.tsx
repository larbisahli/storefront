import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Breadcrumb = ({ componentName, ...props }: Props) =>
  componentFactory(componentName, ModuleNames.BREADCRUMB, { ...props })

export default Breadcrumb
