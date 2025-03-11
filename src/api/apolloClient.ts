import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const API_GRAPHQL_URL = 'http://44.194.216.102:3000/graphql';

// Apollo Client 설정
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: API_GRAPHQL_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});
