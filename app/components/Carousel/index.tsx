import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Carousel = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.CAROUSEL, props)

export default Carousel
