import { CouponType } from 'coupon.type'
import { AttributeType, AttributeValueType } from './attribute.type'
import { CategoryType } from './category.type'
import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'
import { ProductTypes, ThunkStatus } from './enums.type'
import { TagType } from './tag.type'

export interface VariationOptionsType {
  id: number
  productId?: number
  title: Scalars['String']
  isDisable: Scalars['Boolean']
  active: boolean
  thumbnail: ImageType[]
  options: number[]
  price: PriceType
  quantity: Scalars['Int']
  sku: Scalars['String']
  key?: string
}

export interface PriceType {
  finalPrice: {
    currency: {
      code: string
    }
    value: number
  }
  finalPriceExclTax: {
    currency: {
      code: string
    }
    value: number
  }
  discount?: {
    amountOff?: number
    percentOff?: number
  }
}

interface PriceRangeType {
  maximumPrice: PriceType
  minimumPrice: PriceType
}

export interface ProductType {
  id?: number
  slug?: Scalars['String']
  name?: Scalars['String']
  sku?: Nullable<Scalars['String']>
  priceRange?: PriceRangeType
  price?: PriceType
  quantity?: Scalars['Int']
  type?: ProductTypes
  inStock?: Scalars['Boolean']
  shortDescription?: Nullable<Scalars['String']>
  description?: Scalars['String']
  published?: Scalars['Boolean']
  status?: 'draft' | 'publish'
  disableOutOfStock?: Scalars['Boolean']
  note?: Nullable<Scalars['String']>
  thumbnail?: ImageType[]
  gallery?: ImageType[]
  categories?: Array<CategoryType>
  tags?: Nullable<Array<Nullable<TagType>>>
  variationOptions?: VariationOptionsType[]
  variations?: VariationsType[]
  relatedProducts?: Nullable<Array<ProductRef>>
  upsellProducts?: Nullable<Array<ProductRef>>
  crossSellProducts?: Nullable<Array<ProductRef>>
  productSeo?: ProductSeoType
  // Order properties for the cart functionality
  orderQuantity?: number
  orderVariationOption?: VariationOptionsType | undefined
  ratingSummary?: number
  reviewCount?: number
}

export interface ProductSeoType {
  productId: number
  slug: string
  metaTitle?: string
  metaKeywords?: string
  metaDescription?: string
  metaImage?: ImageType[]
}

export interface ProductRef {
  id?: Scalars['Int']
  slug?: Scalars['String']
  name?: Scalars['String']
  sku?: Nullable<Scalars['String']>
  salePrice?: Scalars['Float']
  comparePrice?: Scalars['Float']
  buyingPrice?: Scalars['Float']
  maxPrice?: Scalars['Float']
  minPrice?: Scalars['Float']
  quantity?: Scalars['Int']
}

export interface VariationsType extends AttributeType {
  attribute: AttributeType
  value?: Nullable<AttributeValueType>
}

export type CartItemType = ProductType & {
  // [key: string]: any;
  // Order properties for the cart functionality
  key?: Scalars['ID']
  orderQuantity?: number
  orderVariationOption?: VariationOptionsType | undefined
}

export interface CartState {
  items: CartItemType[]
  coupon: CouponType
  status: ThunkStatus
}
