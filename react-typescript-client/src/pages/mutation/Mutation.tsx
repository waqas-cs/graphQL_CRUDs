import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_PERSON = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      name
      email
      car {
        year
        make
        model
      }
    }
  }
`;

function Mutation() {
  // Pass mutation to useMutation

  const [mutateFunction, { data, loading, error }] = useMutation(ADD_PERSON);
  return <div>Mutation</div>;
}

export default Mutation;
