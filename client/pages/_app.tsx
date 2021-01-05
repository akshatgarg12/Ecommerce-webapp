import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Navbar from '../src/components/templates/navbar'
import client from '../src/config/graphql';
import { ApolloProvider } from '@apollo/client';
import UserContextProvider from '../src/context/auth';

function MyApp({ Component, pageProps }) {
  return ( 
  <ApolloProvider client={client}>
    <UserContextProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  </ApolloProvider>
  )
}

export default MyApp
