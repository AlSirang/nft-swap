import { gql } from "@apollo/client";

export const GET_Submit_Offers = gql`
  query getSubmitOffers($toId: String!, $toCollection: String!) {
    submitOffers(where: { toId: $toId, toCollection: $toCollection }) {
      toId
      fromId
      offerIndex
      msgValue
      toCollection
      fromCollection
      from
    }
  }
`;

export const GET_Removed_Offers = gql`
  query getRemovedOffers($toId: String!, $toCollection: String!) {
    offerRemoveds(where: { toId: $toId, toCollection: $toCollection }) {
      offerId
      fromId
      toId
      toCollection
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query getCollections($page: Int!) {
    submitOffers(first: $page) {
      toCollection
      fromCollection
    }
  }
`;
