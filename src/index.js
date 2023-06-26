import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CryptoContext } from './Context/CryptoContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>  
      <CryptoContext> 
          <App/>
      </CryptoContext> 
    </QueryClientProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);