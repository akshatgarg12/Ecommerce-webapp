import { ApolloClient, InMemoryCache } from '@apollo/client';
import {SERVER_URL} from '../constants/dev';

const client = new ApolloClient({
  uri: `${SERVER_URL}/api/graphql`,
  cache: new InMemoryCache()
});



export default client;