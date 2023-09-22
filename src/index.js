import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import { Provider } from 'react-redux';
import store from './store/store';

import './style/style.scss';


// const store = createStore(reducer, 
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);