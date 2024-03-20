import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import globalReducer from "./state";
import {setupListeners} from "@reduxjs/toolkit/query";

import {Amplify} from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

const store = configureStore({
  reducer: {
    global: globalReducer,
    //[api.reducerPath]: api.reducer,
  },
  //middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
)
