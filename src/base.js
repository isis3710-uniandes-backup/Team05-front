import * as firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUv8Qv0jrVbJYX5iDr-WE-n4MPGJfM5ms",
  authDomain: "bioandes-2019.firebaseapp.com",
  databaseURL: "https://bioandes-2019.firebaseio.com",
  projectId: "bioandes-2019",
  storageBucket: "bioandes-2019.appspot.com",
  messagingSenderId: "320200819859"
};

const base = firebase.initializeApp(firebaseConfig);

export default base;