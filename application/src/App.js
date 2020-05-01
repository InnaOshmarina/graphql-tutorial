import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Tabs from './components/Tabs/Tabs';
import theme from './components/theme';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Tabs />
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
