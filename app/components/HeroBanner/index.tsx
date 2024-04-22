import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const HeroBanner = (props: Props) =>
  componentFactory(props?.componentName, ModuleNames.HERO_BANNER, props)

export default HeroBanner
