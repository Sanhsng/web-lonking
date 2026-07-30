import { gql } from "graphql-request";

export const GET_PRIZES = gql`
  query GetPrizes {
    prizesFields(first: 100) {
      nodes {
        id
        title
        slug
        prizes {
          prizeName
          quantity
          prizeImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_LUCKY_CODES = gql`
  query GetLuckyCodes {
    luckyCodes(first: 1000) {
      nodes {
        id
        title
        slug
        luckyCodes {
          code
          customerName
          phone
          status
        }
      }
    }
  }
`;

export const GET_LUCKY_CODE_BY_SLUG = gql`
  query GetLuckyCode($id: ID!) {
    luckyCode(id: $id, idType: SLUG) {
      id
      title
      slug
      luckyCodes {
        code
        customerName
        phone
        status
      }
    }
  }
`;
