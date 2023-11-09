import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql', // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
