import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const subscription = gql`
  subscription {
    User(filter: { mutation_in: [CREATED, DELETED, UPDATED] }) {
      mutation
      node {
        id
        createdAt
        bussiness
        name
        whichClass
      }
    }
  }
`;

const MessageItem = ({ user }) => (
  <tr>
    <th scope="row">{user.id}</th>
    <td>{user.name}</td>
    <td>{user.bussiness}</td>
    <td>{user.whichClass}</td>
  </tr>
);

const MessageListView = class extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    return (
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Bussiness</th>
              <th scope="col">Class</th>
            </tr>
          </thead>
          <tbody>
            {data.allUsers.map(user => (
              <MessageItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
    );
  }
};

const Users = () => (
  <Query
    query={gql`
      {
        allUsers {
          id
          name
          bussiness
          whichClass
        }
      }
    `}
  >
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>error :(</p>;
      }
      const more = () =>
        subscribeToMore({
          document: subscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { mutation, node } = subscriptionData.data.User;
            if (mutation !== "CREATED") return prev;
            return Object.assign({}, prev, {
              allUsers: [node, ...prev.allUsers].slice(0, 20)
            });
          }
        });
      return <MessageListView data={data} subscribeToMore={more} />;
    }}
  </Query>
);

export default Users;
