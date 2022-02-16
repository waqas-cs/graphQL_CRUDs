const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Author {
    name: String!
    email: String!
  }
  type Book {
    title: String!
    author: Author!
  }
  type Query {
    books: [Book]
  }

  type Car {
    year: Int!
    make: String!
    model: String!
  }
  type Person {
    id: ID!
    name: String!
    email: String!
    car: Car!
  }
  type Query {
    persons(year: String): [Person]
    #persons: [Person]
  }

  type Mutation {
    addPerson(
      id: Int!
      name: String
      email: String
      year: Int
      make: String
      model: String
    ): Person!
  }
  mutation {
    addPerson(
      id: 4
      name: "ishaq"
      email: "ishaq@gmail.com"
      year: 2017
      make: "MG"
      model: "HS"
    ) {
      id
      name
    }
  }
`;
const books = [
  {
    title: "The Awakening",
    author: {
      name: "Kate Chopin",
      email: "kate@gmail.com",
    },
  },
  {
    title: "City of Glass",
    author: {
      name: "Paul Auster",
      email: "paul@gmail.com",
    },
  },
];

const persons = [
  {
    id: "1",
    name: "john",
    email: "john@gmail.com",
    car: {
      year: 2018,
      make: "Honda",
      model: "Civic",
    },
  },
  {
    id: "2",
    name: "khan",
    email: "john@gmail.com",
    car: {
      year: 2017,
      make: "toyota",
      model: "corolla",
    },
  },
  {
    id: "3",
    name: "ali",
    email: "john@gmail.com",
    car: {
      year: 2022,
      make: "audi",
      model: "A6",
    },
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    persons: (_, { year }) =>
      persons.filter((person) => person.car.year == year),
    //persons: () => persons,
  },
  Mutation: {
    addPerson: (root, args) => {
      const { id, name, email, year, make, model } = args;
      const newUser = {
        id,
        name,
        email,
        car: {
          year,
          model,
          make,
        },
      };
      persons.push(newUser);
      console.log(persons);
      return newUser;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
