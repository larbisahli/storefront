import { ImageType } from 'common.type'
import { Nullable, Scalars } from 'custom.type'

export interface CategoryType {
  id?: Scalars['ID']
  parentId?: Nullable<Scalars['ID']>
  name?: Scalars['String']
  description?: Nullable<Scalars['String']>
  children?: Nullable<Array<CategoryType>>
  active?: Scalars['Boolean']
  thumbnail?: ImageType
  icon?: Nullable<Scalars['String']>
  hasChildren?: Scalars['Boolean']
}
