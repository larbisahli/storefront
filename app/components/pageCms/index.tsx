import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const PageCms = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.PAGE_CMS, props)

export default PageCms
