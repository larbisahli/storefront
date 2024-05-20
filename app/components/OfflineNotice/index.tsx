import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const OfflineNotice = (props: any) =>
  componentFactory(props?.moduleName, ModuleGroup.OFFLINE_NOTICE, {
    ...props,
    moduleName: 'OfflineNotice'
  })

export default OfflineNotice
