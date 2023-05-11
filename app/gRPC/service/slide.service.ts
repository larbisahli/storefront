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

  public async getHeroSlide(alias: string) {
    const getStoreHeroBanner = promisify(this.getStoreHeroBanner).bind(this)
    return await getStoreHeroBanner({ alias })
      .then((data) => {
        console.log({ data })
        return { sliders: data?.sliders ?? [], error: null }
      })
      .catch((error) => ({ error, sliders: null }))
  }
}
