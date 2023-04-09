import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'

export interface CategoryType {
  id: Scalars['Int']
  name: Scalars['String']
  description: Nullable<Scalars['String']>
  children: Nullable<Array<CategoryRefLevel2>>
  thumbnail: ImageType[]
  hasChildren?: Scalars['Boolean']
}

// To prevent circular references
export interface CategoryRefLevel2 {
  id: Scalars['Int']
  name: Scalars['String']
  description: Nullable<Scalars['String']>
  thumbnail: ImageType[]
  children: Nullable<Array<CategoryRefLevel3>>
  hasChildren?: Scalars['Boolean']
}

// To prevent circular references
export interface CategoryRefLevel3 {
  id: Scalars['Int']
  name: Scalars['String']
  description: Nullable<Scalars['String']>
  thumbnail: ImageType[]
  hasChildren?: Scalars['Boolean']
  children: []
}
