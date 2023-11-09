import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Launches from './components/Launches';
import './App.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">

        </header>
        <main>
          <Launches />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
