import { gql } from '@apollo/client'

export const HOMEPAGE_QUERY = gql`
  query HomePage($alias: String!) {
    menu(alias: $alias) {
      id
      name
      description
      thumbnail {
        id
        image
        placeholder
      }
      children {
        id
        name
        description
        children {
          id
          name
          description
        }
      }
    }
    heroSlider(alias: $alias) {
      id
      destinationUrl
      thumbnail {
        id
        image
        placeholder
      }
      title
      description
      btnLabel
      styles {
        align
        textColor
        btnBgc
        btnTextColor
      }
    }
  }
`
