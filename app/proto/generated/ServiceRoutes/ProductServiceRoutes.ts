// Original file: app/proto/serviceRoutes.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type {
  PopularProductsRequest as _productPackage_PopularProductsRequest,
  PopularProductsRequest__Output as _productPackage_PopularProductsRequest__Output
} from '../productPackage/PopularProductsRequest'
import type {
  PopularProductsResponse as _productPackage_PopularProductsResponse,
  PopularProductsResponse__Output as _productPackage_PopularProductsResponse__Output
} from '../productPackage/PopularProductsResponse'

export interface ProductServiceRoutesClient extends grpc.Client {
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
  getPopularProducts(
    argument: _productPackage_PopularProductsRequest,
    callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>
  ): grpc.ClientUnaryCall
}

export interface ProductServiceRoutesHandlers
  extends grpc.UntypedServiceImplementation {
  getPopularProducts: grpc.handleUnaryCall<
    _productPackage_PopularProductsRequest__Output,
    _productPackage_PopularProductsResponse
  >
}

export interface ProductServiceRoutesDefinition extends grpc.ServiceDefinition {
  getPopularProducts: MethodDefinition<
    _productPackage_PopularProductsRequest,
    _productPackage_PopularProductsResponse,
    _productPackage_PopularProductsRequest__Output,
    _productPackage_PopularProductsResponse__Output
  >
}
