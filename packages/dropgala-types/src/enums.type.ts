/* eslint-disable no-unused-vars */

export enum ComponentNames {
  HEADER = 'Header',
  FOOTER = 'Footer',
  HERO_BANNER = 'HeroBanner',
  CART_DRAWER = 'CartDrawer',
  MENU_DRAWER = 'MenuDrawer',
  HOMEPAGE_CATEGORIES = 'HomePageCategories',
  PRODUCT_CARD = 'ProductCard',
  PRODUCT_DETAILS = 'ProductDetails',
  LINKED_PRODUCTS = 'LinkedProducts',
  BREADCRUMB = 'Breadcrumb',
  CHECKOUT_BREADCRUMB = 'CheckoutBreadcrumb',
  CHECKOUT_HEADER = 'CheckoutHeader'
}

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

export enum ShippingTypes {
  Fixed = 'fixed',
  Free = 'free_shipping'
}

export enum CouponDiscountType {
  Fixed = 'fixed',
  Percentage = 'percentage',
  FreeShipping = 'free_shipping'
}

export enum PrivacyAccessibility {
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

export enum ProductTypes {
  Simple = 'simple',
  Variable = 'variable'
}
