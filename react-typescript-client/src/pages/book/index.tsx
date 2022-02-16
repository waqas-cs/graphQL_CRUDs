import React from "react";
import { useQuery, gql } from "@apollo/client";

interface dataProps {
  books: {
    title: string;
    author: {
      name: string;
    };
  }[];
}

const Book: React.FC = () => {
  const GET_PERSON = gql`
    query {
      books {
        title
        author {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery<dataProps>(GET_PERSON);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <table>
      <thead>
        <tr>
          <td>Books</td>
          <td>Author Name</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data?.books.map(({ title, author }) => {
            return (
              <tr key={title}>
                <td>{title}</td>
                <td>{author.name}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Book;
