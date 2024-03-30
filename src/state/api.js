import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9000"}),
  reducerPath: "adminApi",
  tagTypes: [
    "xmlfiles"
  ],
  endpoints: (build) => ({
    getXmlFiles: build.query({
      query: ({page, pageSize, sort, search}) => ({
        url: "client/transactions",
        method: "GET",
        params: {page, pageSize, sort, search},
      }),
      providesTags: ["Transactions"],
    })
  }),
});

export const {
  useGetUserQuery,
} = api;
