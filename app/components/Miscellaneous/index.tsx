import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const Miscellaneous = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.MISCELLANEOUS, props)

export default Miscellaneous
