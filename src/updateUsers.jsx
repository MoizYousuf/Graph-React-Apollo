import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class UpdateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      bussiness: "",
      Class: "",
      flag: false
    };
  }
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation updateUser(
            $id: ID!
            $name: String!
            $bussiness: String!
            $whichClass: String!
          ) {
            updateUser(
              id: $id
              name: $name
              bussiness: $bussiness
              whichClass: $whichClass
            ) {
              id
              updatedAt
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
              height: "350px",
              textAlign: "center"
            }}
          >
            <h1>Update</h1>
            <input
              style={input}
              placeholder="id"
              onChange={e =>
                this.setState({
                  id: e.target.value
                })
              }
            />
            <br />
            <input
              style={input}
              placeholder="Your Name"
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
            />
            <br />
            <input
              style={input}
              placeholder="Your Bussiness"
              onChange={e =>
                this.setState({
                  bussiness: e.target.value
                })
              }
            />
            <br />
            <input
              style={input}
              placeholder="Your Class"
              onChange={e =>
                this.setState({
                  Class: e.target.value
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
              onClick={() =>
                user(
                  {
                    variables: {
                      id: this.state.id,
                      name: this.state.name,
                      bussiness: this.state.bussiness,
                      whichClass: this.state.Class
                    }
                  },
                  this.setState({ flag: true })
                )
              }
            >
              Updates
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

export default UpdateUsers;
