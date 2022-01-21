import { gql } from "@apollo/client";

export const getCurrencies = gql`
  query getCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const getCategories = gql`
  query GetCategories {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
