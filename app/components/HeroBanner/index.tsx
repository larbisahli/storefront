import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import type { HeroBannerType } from '@dropgala/types/slider.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  heroSlider: HeroBannerType[]
}

const HeroBanner = ({ heroSlider }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.HERO_BANNER, {
    infiniteLoop: true,
    items: heroSlider
  })
}

export default HeroBanner
