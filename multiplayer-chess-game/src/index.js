import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";

// Use your config values here.
firebase.initializeApp({
  apiKey: "AIzaSyB73bHuq6YEMGVY5cMbH1gMArqpMv8YMHo",
  authDomain: "chesstopia-7cc12.firebaseapp.com",
  projectId: "chesstopia-7cc12",
  storageBucket: "chesstopia-7cc12.appspot.com",
  messagingSenderId: "664746394112",
  appId: "1:664746394112:web:ec82a264b2eb1d69b48ee5",
  measurementId: "G-GP6YXY894Z",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
