import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

interface personProps {
  persons: {
    name: string;
    email: string;
    car: {
      year: number;
      make: string;
      model: string;
    };
  }[];
}
type propsPerson = {
  year: String;
};
function UseLazy_Query(props: propsPerson) {
  const GET_PERSON = gql`
    query ($selectedYear: String) {
      persons(year: $selectedYear) {
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

  const [getDog, { loading, error, data }] =
    useLazyQuery<personProps>(GET_PERSON);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <button onClick={() => getDog({ variables: { selectedYear: "2018" } })}>
        Lazy Click
      </button>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Year, Make, Model</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.persons.map(({ name, email, car }) => {
              const { year, make, model } = car;
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    {year} | {make} | {model}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default UseLazy_Query;
