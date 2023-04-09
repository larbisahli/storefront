import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'

export interface HeroBannerType {
  id?: Scalars['ID']
  destinationUrl?: Nullable<Scalars['String']>
  thumbnail?: ImageType
  title?: Scalars['String']
  description?: Nullable<Scalars['String']>
  btnLabel?: Scalars['String']
  styles?: {
    textColor?: string
    btnBgc?: string
    btnTextColor?: string
  }
  displayOrder?: Scalars['Int']
}
