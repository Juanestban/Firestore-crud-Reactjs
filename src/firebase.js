import firebase from 'firebase/app';

import 'firebase/firestore';

// firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEj_WlCcVc7DCFtUN8ogCpq64XlrKpeeA",
    authDomain: "crud-firebase-sveltejs.firebaseapp.com",
    databaseURL: "https://crud-firebase-sveltejs.firebaseio.com",
    projectId: "crud-firebase-sveltejs",
    storageBucket: "crud-firebase-sveltejs.appspot.com",
    messagingSenderId: "606409643890",
    appId: "1:606409643890:web:6181b68b884d6753196feb"
};

// initializal Firebase
const fb = firebase.initializeApp(firebaseConfig);

// fireStore
export const database = fb.firestore();