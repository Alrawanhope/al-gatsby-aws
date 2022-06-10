/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFinalCode = /* GraphQL */ `
  mutation CreateFinalCode(
    $input: CreateFinalCodeInput!
    $condition: ModelFinalCodeConditionInput
  ) {
    createFinalCode(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateFinalCode = /* GraphQL */ `
  mutation UpdateFinalCode(
    $input: UpdateFinalCodeInput!
    $condition: ModelFinalCodeConditionInput
  ) {
    updateFinalCode(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteFinalCode = /* GraphQL */ `
  mutation DeleteFinalCode(
    $input: DeleteFinalCodeInput!
    $condition: ModelFinalCodeConditionInput
  ) {
    deleteFinalCode(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
