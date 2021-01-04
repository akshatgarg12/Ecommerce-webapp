import { ApolloClient, InMemoryCache } from '@apollo/client';
import {SERVER_URL} from '../constants/dev';
import {gql} from '@apollo/client';

const client = new ApolloClient({
  uri: `${SERVER_URL}/api/graphql`,
  cache: new InMemoryCache()
});



export default client;