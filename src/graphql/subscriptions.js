/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateXmlModel = /* GraphQL */ `
  subscription OnCreateXmlModel(
    $filter: ModelSubscriptionXmlModelFilterInput
    $owner: String
  ) {
    onCreateXmlModel(filter: $filter, owner: $owner) {
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
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateXmlModel = /* GraphQL */ `
  subscription OnUpdateXmlModel(
    $filter: ModelSubscriptionXmlModelFilterInput
    $owner: String
  ) {
    onUpdateXmlModel(filter: $filter, owner: $owner) {
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
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteXmlModel = /* GraphQL */ `
  subscription OnDeleteXmlModel(
    $filter: ModelSubscriptionXmlModelFilterInput
    $owner: String
  ) {
    onDeleteXmlModel(filter: $filter, owner: $owner) {
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
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
