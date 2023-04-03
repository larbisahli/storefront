import { AttributeType, AttributeValueType } from 'attribute.type'
import { CategoryType } from 'category.type'
import { ImageType } from 'common.type'
import { Nullable, ProductEnum, Scalars } from 'custom.type'
import { TagType } from 'tag.type'

export interface VariationOptionsType {
  id: Scalars['ID']
  productId?: Scalars['ID']
  title: Scalars['String']
  isDisable: Scalars['Boolean']
  active: boolean
  image: Scalars['String']
  options: string[]
  salePrice: Scalars['Float']
  comparePrice: Scalars['Float']
  buyingPrice: Scalars['Float']
  quantity: Scalars['Int']
  sku: Scalars['String']
  key?: string
}

export interface ProductType {
  id?: Scalars['ID']
  key?: Scalars['ID'] // for cart item
  slug?: Scalars['String']
  name?: Scalars['String']
  sku?: Nullable<Scalars['String']>
  salePrice?: Scalars['Float']
  comparePrice?: Scalars['Float']
  buyingPrice?: Scalars['Float']
  maxPrice?: Scalars['Float']
  minPrice?: Scalars['Float']
  quantity?: Scalars['Int']
  type?: { id: ProductEnum }
  inStock?: Scalars['Boolean']
  shortDescription?: Nullable<Scalars['String']>
  description?: Scalars['String']
  published?: Scalars['Boolean']
  status?: 'draft' | 'publish'
  disableOutOfStock?: Scalars['Boolean']
  note?: Nullable<Scalars['String']>
  thumbnail?: ImageType
  gallery?: ImageType[]
  categories?: Array<CategoryType>
  tags?: Nullable<Array<Nullable<TagType>>>
  variationOptions?: VariationOptionsType[]
  variations?: variationsType[]
  // [key: string]: any;
  // Order properties
  orderQuantity?: Scalars['Int']
  orderVariationOption?: Nullable<VariationOptionsType>
}

export interface variationsType {
  attribute: AttributeType
  values?: Array<Nullable<AttributeValueType>>
  value?: Nullable<AttributeValueType>
}
