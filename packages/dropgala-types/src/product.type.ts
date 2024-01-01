import { AttributeType, AttributeValueType } from './attribute.type'
import { CategoryType } from './category.type'
import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'
import { ProductTypes, ThunkStatus } from './enums.type'
import { TagType } from './tag.type'
import { ShippingAddress } from 'address.type'
import { ShippingType } from 'shipping.type'
import { PaymentConfiguration } from 'payment.type'

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

export interface Price {
  finalPrice: FinalPrice
  finalPriceExclTax: FinalPrice
  discount: {
    amountOff: number
    percentOff: number
  }
}

export type CartItemType = ProductType & {
  id: number
  name?: string
  sku?: string
  type?: string
  thumbnail?: ImageType
  price?: string
  quantity?: string
  key?: Scalars['ID']
  orderQuantity: number
  orderVariationOption?: VariationOptionsType | undefined
}

export interface FinalPrice {
  currency: { code: string }
  value: number
}

export interface Discount {
  label: string
  amount: FinalPrice
}

export interface Summary {
  grandTotal: FinalPrice
  subtotalIncludingTax: FinalPrice
  subtotalExcludingTax: FinalPrice
  subtotalWithDiscountExcludingTax: FinalPrice
  totalShippingCost: FinalPrice
  discount: Discount
}

export interface Metadata {
  ip: string
  geo: {
    city: string
    region: string
    latlong: string
  }
}

export interface StepsConfig {
  availableSteps: string[]
  currentStep: string
}

export interface AppliedCoupon {
  code: string
}

export interface Tax {
  label: string
  percent: number
  amount: FinalPrice
}

export interface CartType {
  id?: string | null
  items: CartItemType[]
  totalQuantity: number
  total: {
    totalPrice: {
      currency: { code: string }
      value: number
    }
    totalExclTax: {
      currency: { code: string }
      value: number
    }
  }
  loadingStatus: ThunkStatus
}

export interface CheckoutState {
  cartId: string | null
  email?: Nullable<string>
  shippingAddress?: Nullable<ShippingAddress>
  shipments?: Nullable<ShippingType>
  paymentConfiguration?: Nullable<PaymentConfiguration>
  summary?: Nullable<Summary>
  metadata?: Nullable<Metadata>
  stepsConfig?: Nullable<StepsConfig>
  status?: string
  appliedCoupon?: Nullable<AppliedCoupon>
  tax?: Nullable<Tax>
  loadingStatus?: ThunkStatus
  createdAt?: Scalars['Date']
  updatedAt?: Scalars['Date']
}
