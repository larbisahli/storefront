import { promisify } from 'util'
import {
  RPCStoreFrontPort,
  SliderServiceRoutes,
  createInsecure
} from '../client'

export default class SlideService extends SliderServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure())
  }

  public async getStoreHeroSlides(
    alias: string,
    storeLanguageId: number,
    storeId?: string
  ) {
    const heroSlides = promisify(this.getHeroSlides).bind(this)
    return await heroSlides({ alias, storeLanguageId, storeId })
      .then((data) => {
        return { sliders: data?.sliders ?? [], error: null }
      })
      .catch((error) => ({ error, sliders: null }))
  }

  public async getStorePromoBanner(alias: string) {
    const promoBanner = promisify(this.getPromoBanner).bind(this)
    return await promoBanner({ alias })
      .then((data) => {
        return { banner: data?.banner, error: null }
      })
      .catch((error) => ({ error, banner: null }))
  }
}
