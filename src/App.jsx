import React, { Component } from "react";
import "./App.css";
import {ApolloClient} from 'apollo-client'
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import Users from "./users";
import AddUsers from "./addUsers";
import DeleteUser from "./deleteUsers";
import UpdateUsers from "./updateUsers";
import { getMainDefinition } from 'apollo-utilities';


const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjp9ziyqpaxqu0146eakjua51"
});

const wsLink = new WebSocketLink({
  uri: "wss://subscriptions.graph.cool/v1/cjp9ziyqpaxqu0146eakjua51",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const App = () => (
  <ApolloProvider client={client}>
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <AddUsers />
      <DeleteUser />
      <UpdateUsers />
      <h1>All Users</h1>
      <Users />
    </div>
  </ApolloProvider>
);

export default App;
