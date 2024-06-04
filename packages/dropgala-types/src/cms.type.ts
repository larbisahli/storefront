import { ImageType } from 'common.type'
import { Scalars } from 'custom.type'
import { ModuleGroup, PageLayoutBlocks } from 'enums.type'

export interface LayoutModuleType {
  name: Scalars['String']
  group: Scalars['String']
  pathname: Scalars['String']
  isDefault: Scalars['Boolean']
  thumbnail: ImageType
}

export interface StoreTemplateType {
  id: Scalars['ID']
  name: Scalars['String']
  description: Scalars['String']
  publish: Scalars['Boolean']
}

export interface StoreTemplateType {
  id: Scalars['ID']
  name: Scalars['String']
  description: Scalars['String']
  publish: Scalars['Boolean']
  thumbnail: ImageType[]
  gallery: {
    image: ImageType[]
    position: Scalars['Int']
  }[]
}

export interface StoreLayoutType {
  id: Scalars['String']
  name: Scalars['String']
}

export interface StoreLayoutBlockType {
  id: Scalars['String']
  identifier: Scalars['String']
}

export interface StoreLayoutComponentType {
  layoutBlockId: Scalars['String']
  componentId: Scalars['ID']
  moduleName: string
  moduleGroup: ModuleGroup
  position: Scalars['Int']
  data?: StoreLayoutComponentContentType
  children?: StoreLayoutComponentType[] | []
}

export interface StoreLayoutComponentContentType {
  contentId?: Scalars['ID']
  [key: string]: string | number | boolean | any
}

export interface StoreLayoutType {
  layout: {
    templateId: string
    layoutId: string
    layoutName: string
    [PageLayoutBlocks.Footer]: StoreLayoutComponentType
    [PageLayoutBlocks.Header]: StoreLayoutComponentType
    [PageLayoutBlocks.Main]: StoreLayoutComponentType[]
  }
}

export enum TextAlignEnum {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export enum BorderEnum {
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  ALL = 'all'
}

export interface PageBuilderStyles {
  Typography: {
    fontFamily: { value: string }
    fontWeight: { value: string }
    fontStyle: string
    lineHeight: number
    textTransform: string
    textDecoration: string
    textAlign: TextAlignEnum
    letterSpacing: number
    fontSize: string
    color: string
  }
  Border: {
    borderRadius: number
    borderStyle: { value: string }
    borderWidth: number
    borderColor: string
    border: BorderEnum
  }
  Spacing: {
    marginTop: number
    marginLeft: number
    marginRight: number
    marginBottom: number
    paddingTop: number
    paddingRight: number
    paddingLeft: number
    paddingBottom: number
  }
  Overlay: {
    overlayOpacity: number
    overlayColor: string
  }
}
