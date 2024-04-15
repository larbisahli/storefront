import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const OfflineNotice = ({ ...props }: Props) =>
  componentFactory('OfflineNotice', ModuleNames.OFFLINE_NOTICE, { ...props })

export default OfflineNotice
