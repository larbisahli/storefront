import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';


type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  CommonPackage: {
    Currency: MessageTypeDefinition
    Icon: MessageTypeDefinition
    Seo: MessageTypeDefinition
    Social: MessageTypeDefinition
  }
  SettingsPackage: {
    Settings: MessageTypeDefinition
    StoreConfigRequest: MessageTypeDefinition
    StoreConfigResponse: MessageTypeDefinition
  }
  photoPackage: {
    Image: MessageTypeDefinition
  }
}

