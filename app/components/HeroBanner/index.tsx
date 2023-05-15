import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import type { HeroBannerType } from '@dropgala/types/slider.type'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  heroSlider: HeroBannerType[]
}

const HeroBanner = ({ heroSlider }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.HERO_BANNER, {
    infiniteLoop: true,
    items: heroSlider
  })
}

export default HeroBanner
