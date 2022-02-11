import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BOOK = gql`
  query {
    books {
      title
      author {
        name
      }
    }
  }
`;

const Book = () => {
  const { loading, error, data } = useQuery(GET_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const books = data.books;
  console.log(books);
  return (
    <div>
      {books.map((book) => (
        <p key={book.id}>
          {book.title}, written by {book.author.name}
        </p>
      ))}
    </div>
  );
};

export default Book;
