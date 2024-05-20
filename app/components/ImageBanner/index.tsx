import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const ImageBanner = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.IMAGE_BANNER, props)

export default ImageBanner
