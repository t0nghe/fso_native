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
          url
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

export const CREATE_USER = gql`
mutation ($username: String!,
  $password: String!) {
  createUser(user: {
    username: $username, password: $password
  }) {
    id
    username
  }
}
`;

export const SINGLE_REPOSITORY = gql`
query SingleRepository($id: ID!) {
  repository(id: $id) {
    id
    name
    fullName
    url
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerName
    ownerAvatarUrl
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
  createReview( review: {
    repositoryName: $repositoryName,
    ownerName: $ownerName,
    rating: $rating,
    text: $text
  }) {
    repositoryId
  }
}
`;