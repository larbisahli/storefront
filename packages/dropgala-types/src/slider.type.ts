import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'

export interface HeroBannerType {
  id?: number
  destinationUrl?: Nullable<Scalars['String']>
  thumbnail?: ImageType[]
  title?: Scalars['String']
  description?: Nullable<Scalars['String']>
  btnLabel?: Scalars['String']
  styles?: {
    align: string
    textColor: string
    btnBgc: string
    btnTextColor: string
  }
  displayOrder?: Scalars['Int']
}

export interface PromoBannerType {
  id?: Scalars['Int']
  animationSpeed: string
  backgroundColor: string
  direction: 'RTL' | 'LTR'
  published?: Scalars['Boolean']
  status?: 'draft' | 'publish'
  sliders?: {
    text: string
    textColor: string
    position?: Scalars['Int']
    destinationUrl: string
  }[]
}
