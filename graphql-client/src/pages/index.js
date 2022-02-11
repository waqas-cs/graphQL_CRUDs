import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Book from "./Book";
import Person from "./person";
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

const IndexPage = () => {
  return <div>hello </div>;
};

export default IndexPage;
