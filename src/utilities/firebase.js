import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyDrJjU7FiCS_aQcjF-TDdrWDzjm9pOyx5g',
  authDomain: 'pompom-9ba5f.firebaseapp.com',
  projectId: 'pompom-9ba5f',
  storageBucket: 'pompom-9ba5f.appspot.com',
  messagingSenderId: '26380691534',
  appId: '1:26380691534:web:4ae79be57c164c91d43b1f',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
