export type StoreThemes = '@dropgala/luma'

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export enum ProductStatus {
  Publish = 'publish',
  Draft = 'draft'
}

export enum ShippingEnum {
  Fixed = 'fixed',
  Free = 'free_shipping'
}

export enum CouponEnum {
  Fixed = 'fixed',
  Percentage = 'percentage',
  FreeShipping = 'free_shipping'
}

export enum PrivacyEnum {
  Public = 'public',
  Private = 'private'
}

export enum CartActions {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  CLEAR_ITEM_FROM_CART = 'CLEAR_ITEM_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  TOGGLE_CART = 'TOGGLE_CART',
  APPLY_COUPON = 'APPLY_COUPON',
  REMOVE_COUPON = 'REMOVE_COUPON',
  REHYDRATE = 'REHYDRATE'
}

export enum CheckoutSteps {
  CONTACT_INFORMATION = 'contact_information',
  SHIPPING_METHOD = 'shipping_method',
  PAYMENT_METHOD = 'payment_method',
  ORDER_COMPLETE = 'order_complete'
}

export enum ProductEnum {
  Simple = 'simple',
  Variable = 'variable'
}

export declare type Nullable<T> = T | null

export declare type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  SortOrder: SortOrder.Asc | SortOrder.Desc
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: string | number | Date
  Mixed: string | number | Date
  Upload: string | number | Date
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: string | number | Date
  /** A datetime and timezone string in ISO 8601 format `Y-m-dTH:i:sO`, e.g. `2020-04-20T13:53:12+02:00`. */
  DateTimeTz: string | number | Date
}
