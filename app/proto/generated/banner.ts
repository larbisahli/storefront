import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';


type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  bannerPackage: {
    HeroBanner: MessageTypeDefinition
    HeroBannerRequest: MessageTypeDefinition
    HeroBannerResponse: MessageTypeDefinition
    HeroBannerStyle: MessageTypeDefinition
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

