import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const PageCms = (props: any) =>
  componentFactory(null, ModuleNames.PAGE_CMS, { ...props })

export default PageCms
