import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'

export interface ShippingAddress {
  firstname: Scalars['String']
  lastname: Scalars['String']
  marketingOptIn: Scalars['Boolean']
  country: { code: string }
  address: Scalars['String']
  city: Scalars['String']
  state: Scalars['String']
  zip: Scalars['String']
  phone: Scalars['String']
  email: Scalars['String']
}
