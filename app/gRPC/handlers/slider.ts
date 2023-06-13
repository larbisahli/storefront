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
