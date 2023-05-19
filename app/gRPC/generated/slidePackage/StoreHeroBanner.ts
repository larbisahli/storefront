// Original file: proto/slide.proto

import type {
  Image as _photoPackage_Image,
  Image__Output as _photoPackage_Image__Output
} from '../photoPackage/Image'
import type {
  HeroBannerStyle as _slidePackage_HeroBannerStyle,
  HeroBannerStyle__Output as _slidePackage_HeroBannerStyle__Output
} from '../slidePackage/HeroBannerStyle'

export interface StoreHeroBanner {
  id?: number
  destinationUrl?: string
  title?: string
  description?: string
  thumbnail?: _photoPackage_Image[]
  published?: boolean
  btnLabel?: string
  styles?: _slidePackage_HeroBannerStyle | null
  position?: number
}

export interface StoreHeroBanner__Output {
  id: number
  destinationUrl: string
  title: string
  description: string
  thumbnail: _photoPackage_Image__Output[]
  published: boolean
  btnLabel: string
  styles: _slidePackage_HeroBannerStyle__Output | null
  position: number
}
