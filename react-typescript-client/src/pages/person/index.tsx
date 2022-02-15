/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
//import UseLazy_Query from "../../components/useLazy_Query";

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

function Person(props: propsPerson) {
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
  const { loading, error, data, refetch, networkStatus } =
    useQuery<personProps>(GET_PERSON, {
      variables: { selectedYear },
      //pollInterval: 1000,
      notifyOnNetworkStatusChange: false,
      fetchPolicy: "no-cache",
    });

  if (networkStatus === NetworkStatus.refetch) return <p>"Refetching!"</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <button onClick={() => refetch({ selectedYear: "2017" })}>
        Refetch!
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
      {/* <UseLazy_Query year="2017" /> */}
      <br />
    </>
  );
}

export default Person;
