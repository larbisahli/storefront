import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const BannerWidget = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.BANNER_WIDGET, props)

export default BannerWidget
