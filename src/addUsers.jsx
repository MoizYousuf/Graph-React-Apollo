import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bussiness: "",
      Class: "",
      flag: false
    };
  }
  render() {
    const UserInput = {
      input: {
        name: "test",
        bussiness: "test@test.cz",
        whichClass: "479332973"
      }
    };
    return (
      <Mutation
        mutation={gql`
          mutation createUser(
            $name: String!
            $bussiness: String!
            $whichClass: String!
          ) {
            createUser(
              name: $name
              bussiness: $bussiness
              whichClass: $whichClass
            ) {
              id
              createdAt
            }
          }
        `}
      >
        {user => (
          <div style={{
            width: "40%",
            background: "yellow",
            border: "1px solid black",
            height: "300px",
            textAlign: "center"
          }}>
          <h1>Add User</h1>
            <input
              style={input}
              placeholder="Your Name"
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
            />{" "}
            <br />
            <input
              style={input}
              placeholder="Your Bussiness"
              onChange={e =>
                this.setState({
                  bussiness: e.target.value
                })
              }
            />{" "}
            <br />
            <input
              style={input}
              placeholder="Your Class"
              onChange={e =>
                this.setState({
                  Class: e.target.value
                })
              }
            />{" "}
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
                      name: this.state.name,
                      bussiness: this.state.bussiness,
                      whichClass: this.state.Class
                    }
                  },
                  this.setState({ flag: true })
                )
              }
            >
              Submit
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

export default AddUsers;
