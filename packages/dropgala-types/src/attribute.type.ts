import { Nullable, Scalars } from "custom.type";


export interface AttributeValueType {
    id?: Scalars['ID'];
    attributeId?: Scalars['ID'];
    value?: Scalars['String'];
    color?: Nullable<Scalars['String']>;
  }
  
export interface AttributeType {
    id?: Scalars['ID'];
    name?: Scalars['String'];
    values?: AttributeValueType[] | [];
  }
