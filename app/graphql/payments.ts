import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parentId: Int
    $name: String!
    $description: String!
    $includeInMenu: Boolean!
    $includeInHomePage: Boolean!
    $position: Int!
    $thumbnail: [ImageInput]
    $urlKey: String!
    $metaTitle: String!
    $metaKeywords: String
    $metaDescription: String
    $metaRobots: String!
    $breadcrumbsPriority: Int
    $metaImage: [ImageInput]
    $language: LanguageInput!
  ) {
    createCategory(
      parentId: $parentId
      name: $name
      description: $description
      includeInMenu: $includeInMenu
      includeInHomePage: $includeInHomePage
      position: $position
      thumbnail: $thumbnail
      urlKey: $urlKey
      metaTitle: $metaTitle
      metaKeywords: $metaKeywords
      metaDescription: $metaDescription
      metaRobots: $metaRobots
      breadcrumbsPriority: $breadcrumbsPriority
      metaImage: $metaImage
      language: $language
    ) {
      id
      name
    }
  }
`
