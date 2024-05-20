import { ModuleGroup } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeroCarousel = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.HERO_CAROUSEL, props)

export default HeroCarousel
