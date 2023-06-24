import { setPromoBanner } from '@dropgala/store'
import { PromoBannerType } from '@dropgala/types/slider.type'
import { SlideService } from '@gRPC/services'

const slideService = new SlideService()

export const fetchStoreHeroSlide = async (alias: string) => {
  const { sliders = [], error: slideError } = await slideService.getHeroSlide(
    alias
  )

  if (slideError) {
    throw { slideError }
  }

  return sliders
}

export const fetchStorePromoSlide = async (alias: string) => {
  const { banner, error: slideError } = await slideService.getPromoSlide(alias)

  if (slideError) {
    throw { slideError }
  }

  return setPromoBanner({ banner: banner as unknown as PromoBannerType })
}
