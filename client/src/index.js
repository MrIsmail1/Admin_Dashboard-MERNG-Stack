import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import App from './App';
import { setContext } from 'apollo-link-context';
import React from 'react';


const httpLink = createHttpLink({
	uri: 'http://localhost:5000'
  });
  
  const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
	  headers: {
		Authorization: token ? `Bearer ${token}` : ''
	  }
	};
  });
const client = new ApolloClient({
    link : authLink.concat(httpLink),
    cache : new InMemoryCache()
})
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
	</ApolloProvider>
  </BrowserRouter>
, document.getElementById('root'));