import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
  mutation addMovie(
    $name: String!
    $genre: String!
    $directorId: ID
    $watched: Boolean!
    $rate: Int
  ) {
    addMovie(name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
      name
    }
  }
`;
