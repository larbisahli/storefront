// Original file: app/proto/serviceRoutes.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PopularProductsRequest as _productPackage_PopularProductsRequest, PopularProductsRequest__Output as _productPackage_PopularProductsRequest__Output } from '../productPackage/PopularProductsRequest';
import type { PopularProductsResponse as _productPackage_PopularProductsResponse, PopularProductsResponse__Output as _productPackage_PopularProductsResponse__Output } from '../productPackage/PopularProductsResponse';
import type { ProductRequest as _productPackage_ProductRequest, ProductRequest__Output as _productPackage_ProductRequest__Output } from '../productPackage/ProductRequest';
import type { ProductResponse as _productPackage_ProductResponse, ProductResponse__Output as _productPackage_ProductResponse__Output } from '../productPackage/ProductResponse';

export interface ProductServiceRoutesClient extends grpc.Client {
  getPopularProducts(argument: _productPackage_PopularProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  getPopularProducts(argument: _productPackage_PopularProductsRequest, callback: grpc.requestCallback<_productPackage_PopularProductsResponse__Output>): grpc.ClientUnaryCall;
  
  getProduct(argument: _productPackage_ProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _productPackage_ProductRequest, callback: grpc.requestCallback<_productPackage_ProductResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ProductServiceRoutesHandlers extends grpc.UntypedServiceImplementation {
  getPopularProducts: grpc.handleUnaryCall<_productPackage_PopularProductsRequest__Output, _productPackage_PopularProductsResponse>;
  
  getProduct: grpc.handleUnaryCall<_productPackage_ProductRequest__Output, _productPackage_ProductResponse>;
  
}

export interface ProductServiceRoutesDefinition extends grpc.ServiceDefinition {
  getPopularProducts: MethodDefinition<_productPackage_PopularProductsRequest, _productPackage_PopularProductsResponse, _productPackage_PopularProductsRequest__Output, _productPackage_PopularProductsResponse__Output>
  getProduct: MethodDefinition<_productPackage_ProductRequest, _productPackage_ProductResponse, _productPackage_ProductRequest__Output, _productPackage_ProductResponse__Output>
}
