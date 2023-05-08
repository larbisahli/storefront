import type * as grpc from '@grpc/grpc-js'
import type { MessageTypeDefinition } from '@grpc/proto-loader'

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype
}

export interface ProtoGrpcType {
  photoPackage: {
    Image: MessageTypeDefinition
  }
  productPackage: {
    PopularProductsRequest: MessageTypeDefinition
    PopularProductsResponse: MessageTypeDefinition
    Product: MessageTypeDefinition
    ProductType: MessageTypeDefinition
  }
}
