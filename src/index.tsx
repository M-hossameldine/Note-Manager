import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Can not find the root element!');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
