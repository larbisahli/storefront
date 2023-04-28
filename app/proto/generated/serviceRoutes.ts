import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CategoryServiceRoutesClient as _ServiceRoutes_CategoryServiceRoutesClient, CategoryServiceRoutesDefinition as _ServiceRoutes_CategoryServiceRoutesDefinition } from './ServiceRoutes/CategoryServiceRoutes';
import type { SliderServiceRoutesClient as _ServiceRoutes_SliderServiceRoutesClient, SliderServiceRoutesDefinition as _ServiceRoutes_SliderServiceRoutesDefinition } from './ServiceRoutes/SliderServiceRoutes';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ServiceRoutes: {
    CategoryServiceRoutes: SubtypeConstructor<typeof grpc.Client, _ServiceRoutes_CategoryServiceRoutesClient> & { service: _ServiceRoutes_CategoryServiceRoutesDefinition }
    SliderServiceRoutes: SubtypeConstructor<typeof grpc.Client, _ServiceRoutes_SliderServiceRoutesClient> & { service: _ServiceRoutes_SliderServiceRoutesDefinition }
  }
  bannerPackage: {
    HeroBanner: MessageTypeDefinition
    HeroBannerRequest: MessageTypeDefinition
    HeroBannerResponse: MessageTypeDefinition
    HeroBannerStyle: MessageTypeDefinition
  }
  categoryPackage: {
    Menu: MessageTypeDefinition
    MenuRequest: MessageTypeDefinition
    MenuResponse: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  photoPackage: {
    Image: MessageTypeDefinition
  }
  userPackage: {
    User: MessageTypeDefinition
  }
}

