import { promisify } from 'util';
import { RPCStoreFrontPort, SliderServiceRoutes, createInsecure } from '@lib/rpc-client';

export default class SlideService extends SliderServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure());
  }

  public async getHeroSlide(alias: string) {
    const jwtToken = alias
    const getStoreHeroBanner = promisify(this.getStoreHeroBanner).bind(this)
    return await getStoreHeroBanner({ jwtToken })
      .then((data) => {
        console.log({data})
        return ({ sliders: data?.sliders?? [], error: null })
      })
      .catch((error) => ({ error, sliders: null }));
  }
}