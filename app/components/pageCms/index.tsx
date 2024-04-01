import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const PageCms = (props: any) =>
  componentFactory(ComponentNames.PAGE_CMS, { ...props })

export default PageCms
