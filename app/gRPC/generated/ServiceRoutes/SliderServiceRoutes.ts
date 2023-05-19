// Original file: proto/serviceRoutes.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type {
  HeroBannerRequest as _slidePackage_HeroBannerRequest,
  HeroBannerRequest__Output as _slidePackage_HeroBannerRequest__Output
} from '../slidePackage/HeroBannerRequest'
import type {
  HeroBannerResponse as _slidePackage_HeroBannerResponse,
  HeroBannerResponse__Output as _slidePackage_HeroBannerResponse__Output
} from '../slidePackage/HeroBannerResponse'

export interface SliderServiceRoutesClient extends grpc.Client {
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreHeroBanner(
    argument: _slidePackage_HeroBannerRequest,
    callback: grpc.requestCallback<_slidePackage_HeroBannerResponse__Output>
  ): grpc.ClientUnaryCall
}

export interface SliderServiceRoutesHandlers
  extends grpc.UntypedServiceImplementation {
  getStoreHeroBanner: grpc.handleUnaryCall<
    _slidePackage_HeroBannerRequest__Output,
    _slidePackage_HeroBannerResponse
  >
}

export interface SliderServiceRoutesDefinition extends grpc.ServiceDefinition {
  getStoreHeroBanner: MethodDefinition<
    _slidePackage_HeroBannerRequest,
    _slidePackage_HeroBannerResponse,
    _slidePackage_HeroBannerRequest__Output,
    _slidePackage_HeroBannerResponse__Output
  >
}
