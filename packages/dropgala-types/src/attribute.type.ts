import { Nullable, Scalars } from './custom.type'

export interface AttributeValueType {
  id?: number
  attributeId?: number
  value?: Scalars['String']
  color?: Nullable<Scalars['String']>
}

export interface AttributeType {
  id?: number
  name?: Scalars['String']
  values?: AttributeValueType[] | []
}
