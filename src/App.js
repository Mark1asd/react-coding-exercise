import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './apolloClient';
import Launches from './components/Launches';
import Ticket from './components/Ticket';


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Launches />} />
              <Route path="/ticket/:id" element={<Ticket />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
