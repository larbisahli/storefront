import { StoreThemes } from 'enums.type';
import { ImageType } from './common.type'

export interface ConfigType {
    logo?: ImageType[];
    favicon?: ImageType[];
    storeName?: string;
    storeEmail?: string;
    storeNumber?: string;
    theme: StoreThemes;
    currency?: {
      symbol: string;
      name: string;
      symbol_native: string;
      decimal_digits: number;
      rounding: number;
      code: string;
      name_plural: string;
    };
    socials?: {
      url: string;
        icon: {
          value: string;
          label: string;
        };
    }[]
    maxCheckoutQuantity?: number;
    seo?: {
      metaTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: ImageType[];
      twitterHandle: string;
      twitterCardType: string;
      metaTags: string;
      canonicalUrl: string;
    };
    google?: {
      isEnable: boolean;
      tagManagerId: string;
    };
    facebook?: {
      isEnable: boolean;
      appId: string;
      pageId: string;
    };
  }
