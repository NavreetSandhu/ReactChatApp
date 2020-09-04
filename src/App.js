/*
 * @file: App.js
 * @description: App Configration
 * @author: smartData
 * */

import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './config';
import Routers from './routers';
import Loader from './components/Loader';


export const history = createBrowserHistory();
/************ store configration *********/
const { persistor, store } = configureStore(history);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router history={history}>
          <ToastContainer />
          <Routers {...store} />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
