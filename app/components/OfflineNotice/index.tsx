import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const OfflineNotice = (props: any) =>
  componentFactory(props?.componentName, ModuleNames.OFFLINE_NOTICE, {
    ...props,
    componentName: 'OfflineNotice'
  })

export default OfflineNotice
