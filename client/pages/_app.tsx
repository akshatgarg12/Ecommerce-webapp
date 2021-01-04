import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Navbar from '../src/components/templates/navbar'
import client from '../src/config/graphql';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }) {
  // console.log(client);
  return ( 
  <ApolloProvider client={client}>
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  </ApolloProvider>
  )
}

export default MyApp
