/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
//import Mutation from "../../components/mutation";

export interface personProps {
  persons: {
    id: number;
    name: string;
    email: string;
    car: {
      year: number;
      make: string;
      model: string;
    };
  }[];
}

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

const GET_PERSON = gql`
  query {
    persons {
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

const DELETE_PERSON = gql`
  mutation DeletePerson($id: Int!) {
    deletePerson(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_PERSON = gql`
  mutation updatePerson(
    $id: Int!
    $name: String!
    $email: String!
    $year: Int!
    $make: String!
    $model: String!
  ) {
    updatePerson(
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

function Person() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [car, setCar] = useState<carData>({
    year: "",
    make: "",
    model: "",
  });
  const [updateButton, setUpdateButton] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const {
    loading: getQueryLoading,
    error: getQueryError,
    data: getQueryData,
    refetch,
  } = useQuery<personProps>(GET_PERSON);

  const [
    addPerson,
    { data: addPersonData, loading: addPersonLoading, error: addPersonError },
  ] = useMutation<personProps>(ADD_PERSON);

  const [updatePerson] = useMutation<personProps>(UPDATE_PERSON);

  const [deletePerson] = useMutation<personProps>(DELETE_PERSON);

  const handleCarDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  if (addPersonLoading) return <p>"Submitting..."</p>;
  if (addPersonError)
    return <p>`Submission error! ${addPersonError.message}`</p>;
  if (addPersonData) console.log(addPersonData);

  if (getQueryLoading) return <p>Loading...</p>;
  if (getQueryError) return <p>Error :(</p>;

  const updatePersonHandler = () => {
    const year = Number(car.year);
    console.log("at update section", typeof selectedId);
    updatePerson({
      variables: {
        id: selectedId,
        name: name,
        email: email,
        year: year,
        make: car.make,
        model: car.model,
      },
    });
    setSelectedId(0);
    setUpdateButton(false);
    setName("");
    setEmail("");
    const newCar = {
      year: "",
      make: "",
      model: "",
    };
    setCar(newCar);
    refetch();
    return;
  };

  const addPersonHandler = () => {
    const personId = Math.floor(Math.random() * 1000000000);
    const year = Number(car.year);
    console.log("at add section");
    addPerson({
      variables: {
        id: personId,
        name: name,
        email: email,
        year: year,
        make: car.make,
        model: car.model,
      },
    });
    refetch();
  };

  const editHandler = (
    editId: number,
    editName: string,
    editEmail: string,
    editYear: string,
    editMake: string,
    editModel: string
  ) => {
    const newCar = {
      year: editYear,
      make: editMake,
      model: editModel,
    };
    editId = Number(editId);
    setSelectedId(editId);
    setName(editName);
    setEmail(editEmail);
    setCar(newCar);
    setUpdateButton(true);
    console.log("selected id is = ", selectedId);
  };

  return (
    <>
      {/* <Mutation refetch={refetch} /> */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (selectedId) {
              updatePersonHandler();
            } else {
              addPersonHandler();
            }
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
            onChange={handleCarDetailsChange}
          />
          <br />
          <input
            type="text"
            name="make"
            placeholder="make"
            value={car.make}
            onChange={handleCarDetailsChange}
          />
          <br />
          <input
            type="text"
            name="model"
            placeholder="model"
            value={car.model}
            onChange={handleCarDetailsChange}
          />
          <br />
          <button type="submit">{updateButton ? "Update" : "Add"}</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Year, Make, Model</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {getQueryData?.persons.map(({ id, name, email, car }) => {
            const { year, make, model } = car;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  {year} | {make} | {model}
                </td>
                <td>
                  <button
                    onClick={() => {
                      editHandler(id, name, email, String(year), make, model);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      id = Number(id);
                      deletePerson({
                        variables: {
                          id: id,
                        },
                      });
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
}

export default Person;

// /* eslint-disable react/jsx-pascal-case */
// import React from "react";
// import { useQuery, gql, NetworkStatus } from "@apollo/client";
// //import UseLazy_Query from "../../components/useLazy_Query";
// import Mutation from "../../components/mutation";

// export interface personProps {
//   persons: {
//     name: string;
//     email: string;
//     car: {
//       year: number;
//       make: string;
//       model: string;
//     };
//   }[];
// }
// type propsPerson = {
//   year: String;
// };

// function Person(props: propsPerson) {
//   const selectedYear = props.year;
//   const GET_PERSON = gql`
//     query ($selectedYear: String) {
//       persons(year: $selectedYear) {
//         name
//         email
//         car {
//           year
//           make
//           model
//         }
//       }
//     }
//   `;
//   const { loading, error, data, refetch, networkStatus } =
//     useQuery<personProps>(GET_PERSON, {
//       variables: { selectedYear },
//       //pollInterval: 1000,
//       notifyOnNetworkStatusChange: false,
//       fetchPolicy: "network-only",
//     });

//   if (networkStatus === NetworkStatus.refetch) return <p>"Refetching!"</p>;
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return (
//     <>
//       <button onClick={() => refetch({ selectedYear: "2017" })}>
//         Refetch!
//       </button>
//       <table>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Year, Make, Model</td>
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data?.persons.map(({ name, email, car }) => {
//               const { year, make, model } = car;
//               return (
//                 <tr key={name}>
//                   <td>{name}</td>
//                   <td>{email}</td>
//                   <td>
//                     {year} | {make} | {model}
//                   </td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//       <Mutation />
//       {/* <UseLazy_Query year="2017" /> */}
//       <br />
//     </>
//   );
// }

// export default Person;
