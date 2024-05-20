/* eslint-disable no-unused-vars */

export enum ModuleGroup {
  HEADER = 'Header',
  FOOTER = 'Footer',
  CART_DRAWER = 'CartDrawer',
  MENU_DRAWER = 'MenuDrawer',
  HOMEPAGE_CATEGORIES = 'HomepageCategories',
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
  INSTALL_PROMPT = 'InstallPrompt',
  PRODUCT_NOT_FOUND = 'ProductNotFound',
  COOKIE_POPUP = 'CookiePopup',
  PROMO_BANNER = 'PromoBanner',
  OFFLINE_NOTICE = 'OfflineNotice',
  SUBSCRIPTION = 'Subscription',
  TEXT = 'Text',
  IMAGE = 'Image',
  IMAGE_BANNER = 'ImageBanner',
  VIDEO_BANNER = 'VideoBanner',
  HTML = 'Html',
  CATEGORY_LIST = 'CategoryList',
  PRODUCT_LIST = 'ProductList',
  HERO_CAROUSEL = 'HeroCarousel',
  SPACER = 'Spacer',
  DIVIDER = 'Divider',
  LAYOUT = 'Layout'
}

export enum BreadcrumbComponents {
  BREADCRUMB = 'Breadcrumb'
}

export enum ProductListComponents {
  PRODUCT_LIST = 'ProductList'
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
  GALA_CMS_BUILDER = 'gala-cms-builder',
  GALA_CMS_BUILDER_PAGE = 'gala-cms-builder-page',
  GALA_HOMEPAGE = 'gala-cms-builder-homepage'
}

export enum StoreBuilderActions {
  EDIT_ACTION = 'EDIT_ACTION',
  DELETE_ACTION = 'DELETE_ACTION',
  ADD_NEW_BEFORE = 'ADD_NEW_BEFORE',
  ADD_NEW_AFTER = 'ADD_NEW_AFTER',
  DUPLICATE_BLOCK = 'DUPLICATE_BLOCK'
}

export enum PageLayoutBlocks {
  Header = 'jssHeader',
  Main = 'jssMain',
  Footer = 'jssFooter'
}

export enum SectionSize {
  FULL = 'full',
  AUTO = 'auto'
}

export enum Alignment {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}
