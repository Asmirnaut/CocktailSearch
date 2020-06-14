import firebase from 'firebase/app';
import 'firebase/firestore';
import { FIREBASE_API_KEY } from '../../secret';

// Initialize Firebase
export const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'cocktailsearch.firebaseapp.com',
  databaseURL: 'https://cocktailsearch.firebaseio.com',
  projectId: 'cocktailsearch',
  storageBucket: 'cocktailsearch.appspot.com',
  messagingSenderId: '811566660421',
  appId: '1:811566660421:web:f2cffdef75183125b25c2c',
  measurementId: 'G-CNHMJC07XJ',
};
