/* eslint-disable no-unused-vars */

export enum ModuleNames {
  HEADER = 'Header',
  PROMO_SLIDER = 'PromoSlider',
  FOOTER = 'Footer',
  HERO_BANNER = 'HeroBanner',
  CART_DRAWER = 'CartDrawer',
  MENU_DRAWER = 'MenuDrawer',
  HOMEPAGE_CATEGORIES = 'HomepageCategories',
  CATEGORIES_LIST = 'CategoryList',
  PRODUCT_CARD = 'ProductCard',
  PRODUCT_DETAILS = 'ProductDetails',
  LINKED_PRODUCTS = 'LinkedProducts',
  BREADCRUMB = 'Breadcrumb',
  CHECKOUT_BREADCRUMB = 'CheckoutBreadcrumb',
  CHECKOUT_FOOTER = 'CheckoutFooter',
  CHECKOUT_INFORMATION = 'CheckoutInformation',
  CHECKOUT_ITEMS = 'CheckoutItems',
  CHECKOUT_SHIPPING = 'CheckoutShipping',
  CHECKOUT_PAYMENT = 'CheckoutPayment',
  CHECKOUT_HEADER = 'CheckoutHeader',
  CHECKOUT_CART_ITEMS = 'CheckoutCartItems',
  CONFIRMATION_SUMMARY = 'ConfirmationSummary',
  ORDER_SUMMARY = 'OrderSummary',
  CATEGORY_DETAILS = 'CategoryDetails',
  PAGINATION = 'Pagination',
  MISCELLANEOUS = 'Miscellaneous',
  PAGE_CMS = 'PageCms',
  INSTALL_PROMPT = 'InstallPrompt',
  PRODUCT_NOT_FOUND = 'ProductNotFound',
  PRODUCT_LIST_WIDGET = 'ProductListWidget',
  COOKIE_POPUP = 'CookiePopup',
  PROMO_BANNER = 'PromoBanner',
  OFFLINE_NOTICE = 'OfflineNotice',
  SUBSCRIPTION = 'Subscription'
}

export enum BreadcrumbComponents {
  BREADCRUMB = 'Breadcrumb'
}

export enum ProductListWidgetComponents {
  PRODUCT_LIST_WIDGET = 'ProductListWidget'
}

export enum ProductCardComponents {
  PRODUCT_CARD = 'ProductCard'
}

export enum ProductNotFoundComponents {
  PRODUCT_NOT_FOUND = 'ProductNotFound'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum ProductCardLayout {
  Grid = 'GRID',
  List = 'LIST'
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
  INFORMATION = 'information',
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  CONFIRMATION_SUMMARY = 'confirmation_summary'
}

export enum ProductTypes {
  Simple = 'simple',
  Variable = 'variable'
}

export enum localStorageKeyNames {
  CART_TOTALS = 'cart_totals',
  COOKIE_POPUP = 'cookie_popup',
  POSTPONE_INSTALLATION = 'postpone_installation'
}

export enum AttributeTypeTypes {
  COLOR = 'color',
  TEXT = 'text'
}

export enum ThunkStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export enum StoreBuilder {
  GALA_CMS_BUILDER = 'gala-cms-builder'
}

export enum PageLayoutBlocks {
  Header = 'jssHeader',
  Main = 'jssMain',
  Footer = 'jssFooter'
}
