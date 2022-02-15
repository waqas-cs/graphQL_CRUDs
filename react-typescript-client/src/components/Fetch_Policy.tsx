import React from "react";
import { useQuery, gql } from "@apollo/client";

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
function Fetch_Policy(props: propsPerson) {
  const selectedYear = props.year;
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

  const { loading, error, data } = useQuery<personProps>(GET_PERSON, {
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
    variables: { selectedYear },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
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
export default Fetch_Policy;
