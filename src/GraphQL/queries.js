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
  query getCategories {
    categories {
      name
    }
  }
`;

export const productById = gql`
  query productById($searchId: String!) {
    product(id: $searchId) {
      id
      name
      brand
      gallery
      prices {
        currency {
          symbol
        }
        amount
      }
      inStock
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
    }
  }
`;

export const categoryByName = gql`
  query categoryByName($titleString: String!) {
    category(input: { title: $titleString }) {
      name
      products {
        id
        brand
        name
        inStock
        gallery
        prices {
          currency {
            symbol
          }
          amount
        }
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
      }
    }
  }
`;
