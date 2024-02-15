import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNhdP73iu10cOq0Lytu4jm7lEsUlA0Fas",
    authDomain: "refillmanagment.firebaseapp.com",
    projectId: "refillmanagment",
    storageBucket: "refillmanagment.appspot.com",
    messagingSenderId: "173128542665",
    appId: "1:173128542665:web:6bc9508fac8106088b2018",
    measurementId: "G-WTVL4J3M0X"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export default app;