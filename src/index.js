import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyAUQF6YYuVuT1jdhwdVFmwCIthOG0f2io4",
    authDomain: "campusrecuirtment.firebaseapp.com",
    databaseURL: "https://strawberry-eca3e.firebaseio.com/",
    projectId: "strawberry-eca3e",
    storageBucket: "campusrecuirtment.appspot.com",
    messagingSenderId: "874600307382"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
