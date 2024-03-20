/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDropdownList = /* GraphQL */ `
  mutation CreateDropdownList(
    $input: CreateDropdownListInput!
    $condition: ModelDropdownListConditionInput
  ) {
    createDropdownList(input: $input, condition: $condition) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDropdownList = /* GraphQL */ `
  mutation UpdateDropdownList(
    $input: UpdateDropdownListInput!
    $condition: ModelDropdownListConditionInput
  ) {
    updateDropdownList(input: $input, condition: $condition) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDropdownList = /* GraphQL */ `
  mutation DeleteDropdownList(
    $input: DeleteDropdownListInput!
    $condition: ModelDropdownListConditionInput
  ) {
    deleteDropdownList(input: $input, condition: $condition) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createXmlModel = /* GraphQL */ `
  mutation CreateXmlModel(
    $input: CreateXmlModelInput!
    $condition: ModelXmlModelConditionInput
  ) {
    createXmlModel(input: $input, condition: $condition) {
      id
      moduleName
      xmlid
      namespace
      subtag
      fileName
      context
      MethodModels {
        className
        methodName
        url
        __typename
      }
      urlCount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateXmlModel = /* GraphQL */ `
  mutation UpdateXmlModel(
    $input: UpdateXmlModelInput!
    $condition: ModelXmlModelConditionInput
  ) {
    updateXmlModel(input: $input, condition: $condition) {
      id
      moduleName
      xmlid
      namespace
      subtag
      fileName
      context
      MethodModels {
        className
        methodName
        url
        __typename
      }
      urlCount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteXmlModel = /* GraphQL */ `
  mutation DeleteXmlModel(
    $input: DeleteXmlModelInput!
    $condition: ModelXmlModelConditionInput
  ) {
    deleteXmlModel(input: $input, condition: $condition) {
      id
      moduleName
      xmlid
      namespace
      subtag
      fileName
      context
      MethodModels {
        className
        methodName
        url
        __typename
      }
      urlCount
      createdAt
      updatedAt
      __typename
    }
  }
`;
