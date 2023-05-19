// Original file: proto/serviceRoutes.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type {
  MenuRequest as _categoryPackage_MenuRequest,
  MenuRequest__Output as _categoryPackage_MenuRequest__Output
} from '../categoryPackage/MenuRequest'
import type {
  MenuResponse as _categoryPackage_MenuResponse,
  MenuResponse__Output as _categoryPackage_MenuResponse__Output
} from '../categoryPackage/MenuResponse'

export interface CategoryServiceRoutesClient extends grpc.Client {
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
  getStoreMenu(
    argument: _categoryPackage_MenuRequest,
    callback: grpc.requestCallback<_categoryPackage_MenuResponse__Output>
  ): grpc.ClientUnaryCall
}

export interface CategoryServiceRoutesHandlers
  extends grpc.UntypedServiceImplementation {
  getStoreMenu: grpc.handleUnaryCall<
    _categoryPackage_MenuRequest__Output,
    _categoryPackage_MenuResponse
  >
}

export interface CategoryServiceRoutesDefinition
  extends grpc.ServiceDefinition {
  getStoreMenu: MethodDefinition<
    _categoryPackage_MenuRequest,
    _categoryPackage_MenuResponse,
    _categoryPackage_MenuRequest__Output,
    _categoryPackage_MenuResponse__Output
  >
}
