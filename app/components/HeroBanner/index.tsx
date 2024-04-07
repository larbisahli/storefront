import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const HeroBanner = (props: any) =>
  componentFactory(null, ModuleNames.HERO_BANNER, { ...props })

export default HeroBanner
