import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const VideoBanner = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.VIDEO_BANNER, props)

export default VideoBanner
