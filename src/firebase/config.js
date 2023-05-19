/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCm6yG0AQBmFIEEL8ZzM2Tw3mtvoUYnj2I',
    authDomain: 'car-rental-eede6.firebaseapp.com',
    projectId: 'car-rental-eede6',
    storageBucket: 'car-rental-eede6.appspot.com',
    messagingSenderId: '903624290309',
    appId: '1:903624290309:web:71d1d98d66543b6d0a6c6c',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;
const projectStorage = firebase.storage();
export { projectFirestore, projectAuth, timestamp, projectStorage };
