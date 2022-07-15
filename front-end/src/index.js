import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { auth } from './features/authSlice';

const store = configureStore({
	reducer : {
		auth : auth
	}
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
       <Provider store={store}>
         <App />
       </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
