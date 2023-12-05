import { StoreThemes } from 'enums.type'
import { ImageType } from './common.type'

export interface ConfigType {
  logo?: ImageType[]
  favicon?: ImageType[]
  storeName?: string
  storeEmail?: string
  storeNumber?: string
  alias?: string
  theme: StoreThemes
  locales?: {
    id: number
    name: string
    isDefault: boolean
    localeId: string
  }[]
  currencies?: {
    symbol: string
    name: string
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
  }[]
  defaultCurrency?: {
    symbol: string
    name: string
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
  }
  socials?: {
    url: string
    icon: {
      value: string
      label: string
    }
  }[]
  maxCheckoutQuantity?: number
  seo?: {
    metaTitle: string
    metaDescription: string
    ogTitle: string
    ogDescription: string
    ogImage: ImageType[]
    twitterHandle: string
    twitterCardType: string
    metaTags: string
    canonicalUrl: string
  }
  google?: {
    isEnable: boolean
    tagManagerId: string
  }
  facebook?: {
    isEnable: boolean
    appId: string
    pageId: string
  }
  language?: LanguageType
  device: {
    userAgent: string | null
    isMobile: boolean
    isSafari: boolean
    isDesktop: boolean
    isAndroid: boolean
    isIos: boolean
    isSSR: boolean
  }
}

export interface LanguageType {
  id: number
  name: string
  localeId: string
  direction: 'LTR' | 'RTL'
  iso2: string
  isDefault: boolean
  translation: any
}
