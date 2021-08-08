import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './App';
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <SnackbarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>,
  document.getElementById('root')
);
