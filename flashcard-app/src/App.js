import React from 'react';
import './App.css';
import { Routing } from './Routing';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC57pNPg5JtTYTZiYiBnkKVZdK2vnTgxfQ",
  authDomain: "flash-card-app-938f6.firebaseapp.com",
  projectId: "flash-card-app-938f6",
  storageBucket: "flash-card-app-938f6.appspot.com",
  messagingSenderId: "577846355307",
  appId: "1:577846355307:web:df383bcc0d2d3022d2982e",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <Routing />
  );
}

export default App;
