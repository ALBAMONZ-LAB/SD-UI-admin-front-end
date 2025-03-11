import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql` || 'http://localhost:3000/graphql';
const API_BASE_URL = 'http://localhost:4000/graphql';

// ✅ Apollo Client 설정
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});
