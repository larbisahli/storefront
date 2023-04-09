import { Scalars } from './custom.type'

export interface ImageType {
  id: Scalars['String']
  image: Scalars['String']
  placeholder: Scalars['String']
  isThumbnail: boolean
}

export interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T
}
