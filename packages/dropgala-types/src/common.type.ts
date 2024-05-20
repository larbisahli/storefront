import { Scalars } from './custom.type'

export interface ImageType {
  id?: Scalars['String']
  image: Scalars['String']
  placeholder: Scalars['String']
  isThumbnail?: boolean
  height?: number
  width?: number
}

export interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T
}

export enum CookieNames {
  CUSTOMER_SESSION_NAME = '_cuid',
  XSRF_TOKEN = 'xsrf-token'
}

export enum StoreLayoutNames {
  HOMEPAGE = 'home-page',
  PRODUCT_PAGE = 'product-page',
  TERMS_OF_SERVICES = 'terms-of-service',
  CHECKOUT = 'checkout',
  CONTACT = 'contact',
  PRIVACY_POLICY = 'privacy-policy',
  RETURN_FAQ = 'returns-faq'
}
