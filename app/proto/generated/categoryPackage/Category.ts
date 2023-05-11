// Original file: app/proto/category.proto

import type {
  Image as _photoPackage_Image,
  Image__Output as _photoPackage_Image__Output
} from '../photoPackage/Image'
import type {
  Category as _categoryPackage_Category,
  Category__Output as _categoryPackage_Category__Output
} from '../categoryPackage/Category'
import type {
  Timestamp as _google_protobuf_Timestamp,
  Timestamp__Output as _google_protobuf_Timestamp__Output
} from '../google/protobuf/Timestamp'

export interface Category {
  id?: number
  name?: string
  parentId?: number
  description?: string
  thumbnail?: _photoPackage_Image[]
  active?: boolean
  level?: number
  position?: number
  includeInMenu?: boolean
  hasChildren?: boolean
  children?: _categoryPackage_Category[]
  createdAt?: _google_protobuf_Timestamp | null
  updatedAt?: _google_protobuf_Timestamp | null
}

export interface Category__Output {
  id: number
  name: string
  parentId: number
  description: string
  thumbnail: _photoPackage_Image__Output[]
  active: boolean
  level: number
  position: number
  includeInMenu: boolean
  hasChildren: boolean
  children: _categoryPackage_Category__Output[]
  createdAt: _google_protobuf_Timestamp__Output | null
  updatedAt: _google_protobuf_Timestamp__Output | null
}
