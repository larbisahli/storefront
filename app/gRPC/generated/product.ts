import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';


type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AttributePackage: {
    Attribute: MessageTypeDefinition
    AttributeValue: MessageTypeDefinition
  }
  TagPackage: {
    Tag: MessageTypeDefinition
  }
  categoryPackage: {
    Category: MessageTypeDefinition
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
  productPackage: {
    PopularProductsRequest: MessageTypeDefinition
    PopularProductsResponse: MessageTypeDefinition
    Product: MessageTypeDefinition
    ProductRequest: MessageTypeDefinition
    ProductResponse: MessageTypeDefinition
    ProductSeo: MessageTypeDefinition
    ProductShippingInfo: MessageTypeDefinition
    ProductType: MessageTypeDefinition
    Unit: MessageTypeDefinition
    Variation: MessageTypeDefinition
    VariationOption: MessageTypeDefinition
  }
}

