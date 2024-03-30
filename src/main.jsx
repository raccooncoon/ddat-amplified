import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import globalReducer from "./state";
import {setupListeners} from "@reduxjs/toolkit/query";
import {Amplify} from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import {Authenticator, Image, View} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react/styles/reset.layer.css' // global CSS reset
import '@aws-amplify/ui-react/styles/base.layer.css' // base styling needed for Amplify UI
import '@aws-amplify/ui-react/styles/button.layer.css'
import {Box} from "@mui/material";

Amplify.configure(amplifyconfig);

const store = configureStore({
  reducer: {
    global: globalReducer,
    //[api.reducerPath]: api.reducer,
  },
  //middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const formFields = {
  signIn: {
    username: {
      label: '아이디 입력',
      placeholder: '이메일을 입력하세요',
    },
    password: {
      label: '패스워드 입력',
      placeholder: '패스워드를 입력하세요',
    },
  },
  forgotPassword: {
    username: {
      placeholder: '이메일을 입력하세요',
    },
  }
};

const components = {
  Header() {

    return (
        <View textAlign="center" padding={24}>
          <Image
              alt="DDAT logo"
              src="ddat-logo.png"
              style={{width: 150}}
          />
        </View>
    );
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: '#121934',
        paddingBottom: '6rem',
      }}>
        <Authenticator
            components={components}
            formFields={formFields}
            hideSignUp={true}
        >
          <Provider store={store}>
            <App/>
          </Provider>
        </Authenticator>
      </Box>
    </React.StrictMode>,
);
