// This file is an alternative to Apollo Boost (which is recommended)
// however there has been issues with setting up auth middleware with
// Boost (check if these have been fixed now)

import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
// import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: "http://localhost:5000"
});

// const authLink = setContext(() => {
//   const token = localStorage.getItem('jwtToken');
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ''
//     }
//   };
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
