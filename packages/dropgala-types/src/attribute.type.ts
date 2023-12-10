import { Nullable, Scalars } from './custom.type'

export interface AttributeValueType {
  id?: number
  attributeId?: number
  name?: Scalars['String']
  value?: Scalars['String']
}

export interface AttributeType {
  id?: number
  type?: 'color' | 'text'
  name?: Scalars['String']
  values?: AttributeValueType[] | []
}
