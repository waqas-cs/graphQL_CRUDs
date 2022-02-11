import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PERSON = gql`
  query {
    persons {
      id
      name
    }
  }
`;

const Person = () => {
  const { loading, error, data } = useQuery(GET_PERSON);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const { persons } = data;
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};

export default Person;
