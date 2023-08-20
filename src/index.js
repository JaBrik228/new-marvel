import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './utils/reducer';

import './style/style.scss';


const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
