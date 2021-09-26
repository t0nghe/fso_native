import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
query {
    repositories {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const AUTHORIZE = gql`
mutation ($username: String!,
  $password: String!) {
  authorize(credentials: {
    username: $username, password: $password
  }) {
    accessToken
  }
}
`;

export const AUTHORIZED_USER = gql`
{
  authorizedUser {
    id
    username
  }
}
`;

