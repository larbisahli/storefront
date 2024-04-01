import { ComponentNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

const HeroBanner = (props: any) =>
  componentFactory(ComponentNames.HERO_BANNER, { ...props })

export default HeroBanner
