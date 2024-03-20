/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDropdownList = /* GraphQL */ `
  subscription OnCreateDropdownList(
    $filter: ModelSubscriptionDropdownListFilterInput
  ) {
    onCreateDropdownList(filter: $filter) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDropdownList = /* GraphQL */ `
  subscription OnUpdateDropdownList(
    $filter: ModelSubscriptionDropdownListFilterInput
  ) {
    onUpdateDropdownList(filter: $filter) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDropdownList = /* GraphQL */ `
  subscription OnDeleteDropdownList(
    $filter: ModelSubscriptionDropdownListFilterInput
  ) {
    onDeleteDropdownList(filter: $filter) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateXmlModel = /* GraphQL */ `
  subscription OnCreateXmlModel($filter: ModelSubscriptionXmlModelFilterInput) {
    onCreateXmlModel(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateXmlModel = /* GraphQL */ `
  subscription OnUpdateXmlModel($filter: ModelSubscriptionXmlModelFilterInput) {
    onUpdateXmlModel(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteXmlModel = /* GraphQL */ `
  subscription OnDeleteXmlModel($filter: ModelSubscriptionXmlModelFilterInput) {
    onDeleteXmlModel(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
