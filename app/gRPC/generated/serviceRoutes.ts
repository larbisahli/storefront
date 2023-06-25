import type * as grpc from '@grpc/grpc-js'
import type { MessageTypeDefinition } from '@grpc/proto-loader'

import type {
  CategoryServiceRoutesClient as _ServiceRoutes_CategoryServiceRoutesClient,
  CategoryServiceRoutesDefinition as _ServiceRoutes_CategoryServiceRoutesDefinition
} from './ServiceRoutes/CategoryServiceRoutes'
import type {
  ConfigServiceRoutesClient as _ServiceRoutes_ConfigServiceRoutesClient,
  ConfigServiceRoutesDefinition as _ServiceRoutes_ConfigServiceRoutesDefinition
} from './ServiceRoutes/ConfigServiceRoutes'
import type {
  PageServiceRoutesClient as _ServiceRoutes_PageServiceRoutesClient,
  PageServiceRoutesDefinition as _ServiceRoutes_PageServiceRoutesDefinition
} from './ServiceRoutes/PageServiceRoutes'
import type {
  ProductServiceRoutesClient as _ServiceRoutes_ProductServiceRoutesClient,
  ProductServiceRoutesDefinition as _ServiceRoutes_ProductServiceRoutesDefinition
} from './ServiceRoutes/ProductServiceRoutes'
import type {
  SliderServiceRoutesClient as _ServiceRoutes_SliderServiceRoutesClient,
  SliderServiceRoutesDefinition as _ServiceRoutes_SliderServiceRoutesDefinition
} from './ServiceRoutes/SliderServiceRoutes'

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype
}

export interface ProtoGrpcType {
  AttributePackage: {
    Attribute: MessageTypeDefinition
    AttributeValue: MessageTypeDefinition
  }
  CommonPackage: {
    Currency: MessageTypeDefinition
    Icon: MessageTypeDefinition
    Seo: MessageTypeDefinition
    Social: MessageTypeDefinition
  }
  PagePackage: {
    Page: MessageTypeDefinition
    StorePageRequest: MessageTypeDefinition
    StorePageResponse: MessageTypeDefinition
  }
  ServiceRoutes: {
    CategoryServiceRoutes: SubtypeConstructor<
      typeof grpc.Client,
      _ServiceRoutes_CategoryServiceRoutesClient
    > & { service: _ServiceRoutes_CategoryServiceRoutesDefinition }
    ConfigServiceRoutes: SubtypeConstructor<
      typeof grpc.Client,
      _ServiceRoutes_ConfigServiceRoutesClient
    > & { service: _ServiceRoutes_ConfigServiceRoutesDefinition }
    PageServiceRoutes: SubtypeConstructor<
      typeof grpc.Client,
      _ServiceRoutes_PageServiceRoutesClient
    > & { service: _ServiceRoutes_PageServiceRoutesDefinition }
    ProductServiceRoutes: SubtypeConstructor<
      typeof grpc.Client,
      _ServiceRoutes_ProductServiceRoutesClient
    > & { service: _ServiceRoutes_ProductServiceRoutesDefinition }
    SliderServiceRoutes: SubtypeConstructor<
      typeof grpc.Client,
      _ServiceRoutes_SliderServiceRoutesClient
    > & { service: _ServiceRoutes_SliderServiceRoutesDefinition }
  }
  SettingsPackage: {
    Settings: MessageTypeDefinition
    StoreConfigRequest: MessageTypeDefinition
    StoreConfigResponse: MessageTypeDefinition
  }
  TagPackage: {
    Tag: MessageTypeDefinition
  }
  categoryPackage: {
    Breadcrumbs: MessageTypeDefinition
    Category: MessageTypeDefinition
    CategoryRequest: MessageTypeDefinition
    CategoryResponse: MessageTypeDefinition
    CategorySeo: MessageTypeDefinition
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
    CategoryProductsRequest: MessageTypeDefinition
    PopularProductsRequest: MessageTypeDefinition
    Product: MessageTypeDefinition
    ProductRequest: MessageTypeDefinition
    ProductResponse: MessageTypeDefinition
    ProductSeo: MessageTypeDefinition
    ProductShippingInfo: MessageTypeDefinition
    ProductType: MessageTypeDefinition
    ProductsResponse: MessageTypeDefinition
    Unit: MessageTypeDefinition
    Variation: MessageTypeDefinition
    VariationOption: MessageTypeDefinition
  }
  slidePackage: {
    HeroBannerRequest: MessageTypeDefinition
    HeroBannerResponse: MessageTypeDefinition
    HeroBannerStyle: MessageTypeDefinition
    PromoBannerRequest: MessageTypeDefinition
    PromoBannerResponse: MessageTypeDefinition
    Slider: MessageTypeDefinition
    StoreHeroBanner: MessageTypeDefinition
    StorePromoBanner: MessageTypeDefinition
  }
}
