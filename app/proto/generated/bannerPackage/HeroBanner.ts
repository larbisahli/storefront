// Original file: proto/banner.proto

import type { Image as _photoPackage_Image, Image__Output as _photoPackage_Image__Output } from '../photoPackage/Image';
import type { HeroBannerStyle as _bannerPackage_HeroBannerStyle, HeroBannerStyle__Output as _bannerPackage_HeroBannerStyle__Output } from '../bannerPackage/HeroBannerStyle';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface HeroBanner {
  'id'?: (number);
  'destinationUrl'?: (string);
  'title'?: (string);
  'description'?: (string);
  'thumbnail'?: (_photoPackage_Image)[];
  'published'?: (boolean);
  'btnLabel'?: (string);
  'styles'?: (_bannerPackage_HeroBannerStyle | null);
  'position'?: (number);
  'clicks'?: (number);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
  'createdBy'?: (_userPackage_User | null);
  'updatedBy'?: (_userPackage_User | null);
}

export interface HeroBanner__Output {
  'id': (number);
  'destinationUrl': (string);
  'title': (string);
  'description': (string);
  'thumbnail': (_photoPackage_Image__Output)[];
  'published': (boolean);
  'btnLabel': (string);
  'styles': (_bannerPackage_HeroBannerStyle__Output | null);
  'position': (number);
  'clicks': (number);
  'createdAt': (_google_protobuf_Timestamp__Output | null);
  'updatedAt': (_google_protobuf_Timestamp__Output | null);
  'createdBy': (_userPackage_User__Output | null);
  'updatedBy': (_userPackage_User__Output | null);
}
