// Original file: proto/serviceRoutes.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { HeroBannerRequest as _bannerPackage_HeroBannerRequest, HeroBannerRequest__Output as _bannerPackage_HeroBannerRequest__Output } from '../bannerPackage/HeroBannerRequest';
import type { HeroBannerResponse as _bannerPackage_HeroBannerResponse, HeroBannerResponse__Output as _bannerPackage_HeroBannerResponse__Output } from '../bannerPackage/HeroBannerResponse';

export interface SliderServiceRoutesClient extends grpc.Client {
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  getStoreHeroBanner(argument: _bannerPackage_HeroBannerRequest, callback: grpc.requestCallback<_bannerPackage_HeroBannerResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface SliderServiceRoutesHandlers extends grpc.UntypedServiceImplementation {
  getStoreHeroBanner: grpc.handleUnaryCall<_bannerPackage_HeroBannerRequest__Output, _bannerPackage_HeroBannerResponse>;
  
}

export interface SliderServiceRoutesDefinition extends grpc.ServiceDefinition {
  getStoreHeroBanner: MethodDefinition<_bannerPackage_HeroBannerRequest, _bannerPackage_HeroBannerResponse, _bannerPackage_HeroBannerRequest__Output, _bannerPackage_HeroBannerResponse__Output>
}
