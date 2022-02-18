import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { personProps } from "../../pages/person/index";
const ADD_PERSON = gql`
  mutation AddPerson(
    $id: Int!
    $name: String!
    $email: String!
    $year: Int!
    $make: String!
    $model: String!
  ) {
    addPerson(
      id: $id
      name: $name
      email: $email
      year: $year
      make: $make
      model: $model
    ) {
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
interface carData {
  year: string;
  make: string;
  model: string;
}
interface propsMutation {
  refetch: () => any;
}

function Mutation(props: propsMutation) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [car, setCar] = useState<carData>({
    year: "",
    make: "",
    model: "",
  });

  const [addPerson, { data, loading, error }] =
    useMutation<personProps>(ADD_PERSON);

  if (loading) return <p>"Submitting..."</p>;
  if (error) return <p>`Submission error! ${error.message}`</p>;
  if (data) console.log(data);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const year = Number(car.year);
          addPerson({
            variables: {
              id: 4,
              name: name,
              email: email,
              year: year,
              make: car.make,
              model: car.model,
            },
          });
          const refetch = props.refetch;
          refetch();
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="year"
          placeholder="year"
          value={car.year}
          onChange={(e) => setCar({ ...car, [e.target.name]: e.target.value })}
        />
        <br />
        <input
          type="text"
          name="make"
          placeholder="make"
          value={car.make}
          onChange={(e) => setCar({ ...car, [e.target.name]: e.target.value })}
        />
        <br />
        <input
          type="text"
          name="model"
          placeholder="model"
          value={car.model}
          onChange={(e) => setCar({ ...car, [e.target.name]: e.target.value })}
        />
        <br />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default Mutation;
