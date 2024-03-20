/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDropdownList = /* GraphQL */ `
  query GetDropdownList($id: ID!) {
    getDropdownList(id: $id) {
      id
      tableNames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDropdownLists = /* GraphQL */ `
  query ListDropdownLists(
    $filter: ModelDropdownListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDropdownLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tableNames
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getXmlModel = /* GraphQL */ `
  query GetXmlModel($id: ID!) {
    getXmlModel(id: $id) {
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
export const listXmlModels = /* GraphQL */ `
  query ListXmlModels(
    $filter: ModelXmlModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listXmlModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        moduleName
        xmlid
        namespace
        subtag
        fileName
        context
        urlCount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
