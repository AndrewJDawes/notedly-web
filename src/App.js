// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDom from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// configure our API URI and cache
const uri = process.env.API_URI; // https://parceljs.org/env.html
const httpLink = createHttpLink({ uri });
// Sometimes introducing a new .env file will not work immediately. Try deleting the .cache/ directory in this case.
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

// check for a local token
const data = { isLoggedIn: !!localStorage.getItem('token') };

// write the cache data on initial load
cache.writeData({ data });
// write the cache data after cache is reset
client.onResetStore(() => cache.writeData({ data }));

// import routes
import Pages from './pages';

// import GlobalStyle component
import GlobalStyle from './components/GlobalStyle';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
