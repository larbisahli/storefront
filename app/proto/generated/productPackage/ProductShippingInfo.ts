// Original file: app/proto/product.proto

import type { Unit as _productPackage_Unit, Unit__Output as _productPackage_Unit__Output } from '../productPackage/Unit';

export interface ProductShippingInfo {
  'id'?: (number);
  'weight'?: (number);
  'weightUnit'?: (_productPackage_Unit | null);
  'volume'?: (number);
  'volumeUnit'?: (_productPackage_Unit | null);
  'dimensionWidth'?: (number);
  'dimensionHeight'?: (number);
  'dimensionDepth'?: (number);
  'dimensionUnit'?: (_productPackage_Unit | null);
}

export interface ProductShippingInfo__Output {
  'id': (number);
  'weight': (number);
  'weightUnit': (_productPackage_Unit__Output | null);
  'volume': (number);
  'volumeUnit': (_productPackage_Unit__Output | null);
  'dimensionWidth': (number);
  'dimensionHeight': (number);
  'dimensionDepth': (number);
  'dimensionUnit': (_productPackage_Unit__Output | null);
}
