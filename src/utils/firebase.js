import firebase from 'firebase/app';


// Firebase connection data
const firebaseConfig = {
    apiKey: "AIzaSyDKuxYFQpj4rWPgdwSikkJ6cB-OIOO-RYU",
    authDomain: "beesic-deaf8.firebaseapp.com",
    projectId: "beesic-deaf8",
    storageBucket: "beesic-deaf8.appspot.com",
    messagingSenderId: "503033777466",
    appId: "1:503033777466:web:cc251ab5c35563f5e65403"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;