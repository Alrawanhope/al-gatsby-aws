/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFinalCode = /* GraphQL */ `
  query GetFinalCode($id: ID!) {
    getFinalCode(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listFinalCodes = /* GraphQL */ `
  query ListFinalCodes(
    $filter: ModelFinalCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFinalCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const paginationFinalCodes = /* GraphQL */ `
  query PaginationFinalCodes($limit: Int, $nextToken: String) {
    paginationFinalCodes(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
