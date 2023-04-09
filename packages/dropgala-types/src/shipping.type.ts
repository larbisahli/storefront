import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'

export interface ShippingType {
  id?: Nullable<Scalars['ID']>
  name?: Nullable<Scalars['String']>
  active?: Nullable<Scalars['Boolean']>
  thumbnail?: ImageType
}
