import { Nullable, PrivacyEnum, Scalars } from 'custom.type'

export interface OrderStatusType {
  id?: Nullable<Scalars['ID']>
  name?: Nullable<Scalars['String']>
  color?: Nullable<Scalars['String']>
  privacy?: PrivacyEnum
}
