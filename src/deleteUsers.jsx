import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      flag: false
    };
  }

  render() {
    return (
      <Mutation
        mutation={gql`
          mutation deleteUser($id: ID!) {
            deleteUser(id: $id) {
              id
            }
          }
        `}
      >
        {user => (
          <div
            style={{
              width: "40%",
              background: "yellow",
              border: "1px solid black",
              height: "250px",
              textAlign: "center"
            }}
          >
            <h1>Delete User</h1>
            <input
              style={input}
              type="text"
              placeholder="insert id to delete"
              onChange={e =>
                this.setState({
                  id: e.target.value
                })
              }
            />
            <br />
            <button
              style={{
                border: "1px solid lightblue",
                background: "lightblue",
                padding: "10px",
                marginTop: "1%"
              }}
              onClick={() => {
                user(
                  {
                    variables: {
                      id: this.state.id
                    }
                  },
                  this.setState({ flag: true })
                );
              }}
            >
              Delete
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

const input = {
  border: "1px solid none",
  width: "60%",
  padding: "5px",
  height: "50px",
  marginTop: "1%"
};

export default DeleteUser;
