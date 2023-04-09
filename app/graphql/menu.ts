import { gql } from '@apollo/client'

export const MENU = gql`
  query Menu($alias: String!) {
    menu(alias: $alias) {
      id
      name
      description
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
  }
`
