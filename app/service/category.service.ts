import { promisify } from 'util';
import { RPCStoreFrontPort, CategoryServiceRoutes, createInsecure } from '@lib/rpc-client';

export default class CategoryService extends CategoryServiceRoutes {
  constructor() {
    super(RPCStoreFrontPort, createInsecure());
  }

  public async getMenu(alias: string) {
    const jwtToken = alias
    const getStoreMenu = promisify(this.getStoreMenu).bind(this)
    return await getStoreMenu({ jwtToken })
      .then((data) => ({ menu: data?.menu?? [], error: null }))
      .catch((error) => ({ error, menu: null }));
  }
}